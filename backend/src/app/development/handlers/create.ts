import { httpTransport } from "#infrastructure/fastify";
import DevelopmentPlanCreateSchema from '#app/development/schemas/create';
import createDevelopmentPlan from '#app/development/repositories/create';
import findUserByGuid from '#app/user/repositories/findByGuid';
import { BadRequestError } from "#lib/http/errors";

httpTransport.handler.post('/api/development/v1', DevelopmentPlanCreateSchema, async (req) => {
  const { userGuid, ...developmentPlanData } = req.body;

  // Проверка существования пользователя
  const user = await findUserByGuid(userGuid);
  if (!user) {
    throw new BadRequestError('Пользователь с указанным GUID не существует');
  }

  // Создание плана развития
  const newDevelopmentPlan = await createDevelopmentPlan({
    userGuid,
    ...developmentPlanData,
  });

  return {
    guid: newDevelopmentPlan.guid,
    userGuid: newDevelopmentPlan.userGuid,
    name: newDevelopmentPlan.name,
    planPercent: newDevelopmentPlan.planPercent,
    factPercent: newDevelopmentPlan.factPercent,
    createdAt: newDevelopmentPlan.createdAt,
    updatedAt: newDevelopmentPlan.updatedAt,
  };
});