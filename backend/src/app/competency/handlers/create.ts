import { httpTransport } from "#infrastructure/fastify";
import CompetencyCreateSchema from '#app/competency/schemas/create';
import createCompetency from '#app/competency/repositories/create';
import findUserByGuid from '#app/user/repositories/findByGuid';
import findCompetencyByGuid from '#app/competency/repositories/findByGuid';
import { BadRequestError } from "#lib/http/errors";

httpTransport.handler.post('/api/competency/v1', CompetencyCreateSchema, async (req) => {
  const { userGuid, parentCompetencyId, ...competencyData } = req.body;

  const user = await findUserByGuid(userGuid);
  if (!user) {
    throw new BadRequestError('Пользователь с указанным GUID не существует');
  }

  if (parentCompetencyId) {
    const parentCompetency = await findCompetencyByGuid(parentCompetencyId);
    if (!parentCompetency) {
      throw new BadRequestError('Родительская компетенция с указанным ID не существует');
    }

    if (parentCompetency.userGuid !== userGuid) {
      throw new BadRequestError('Родительская компетенция должна принадлежать тому же пользователю');
    }
  }

  // Создание компетенции
  const newCompetency = await createCompetency({
    userGuid,
    parentCompetencyId: parentCompetencyId || null,
    ...competencyData,
  });

  return {
    guid: newCompetency.guid,
    userGuid: newCompetency.userGuid,
    name: newCompetency.name,
    parentCompetencyId: newCompetency.parentCompetencyId,
    description: newCompetency.description,
    planCount: newCompetency.planCount,
    factCount: newCompetency.factCount,
    isDone: newCompetency.isDone,
    createdAt: newCompetency.createdAt,
    updatedAt: newCompetency.updatedAt,
  };
});