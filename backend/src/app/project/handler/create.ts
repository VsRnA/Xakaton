import { httpTransport } from "#infrastructure/fastify";
import ProjectCreateSchema from '#app/project/schemas/create';
import createProject from '#app/project/repositories/create';
import findUserByGuid from '#app/user/repositories/findByGuid';
import { BadRequestError } from "#lib/http/errors";

httpTransport.handler.post('/api/project/v1', ProjectCreateSchema, async (req) => {
  const { userGuid, ...projectData } = req.body;

  // Проверка существования пользователя
  const user = await findUserByGuid(userGuid);
  if (!user) {
    throw new BadRequestError('Пользователь с указанным GUID не существует');
  }

  // Создание проекта
  const newProject = await createProject({
    userGuid,
    ...projectData,
  });
  
  return {
    guid: newProject.guid,
    userGuid: newProject.userGuid,
    name: newProject.name,
    planNumber: newProject.planNumber,
    factNumber: newProject.factNumber,
    createdAt: newProject.createdAt,
    updatedAt: newProject.updatedAt,
  };
});