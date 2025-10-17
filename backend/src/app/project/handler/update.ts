import { httpTransport } from "#infrastructure/fastify";
import ProjectUpdateSchema from '#app/project/schemas/update';
import updateProject from '#app/project/repositories/update';
import findProjectByGuid from '#app/project/repositories/findByGuid';
import { NotFoundError } from "#lib/http/errors";

httpTransport.handler.put('/api/project/v1/:guid', ProjectUpdateSchema, async (req) => {
  const { guid } = req.params;
  const updateData = req.body;

  // Проверка существования проекта
  const existingProject = await findProjectByGuid(guid);
  if (!existingProject) {
    throw new NotFoundError('Проект не найден');
  }

  // Обновление проекта
  const updatedProject = await updateProject(guid, updateData);

  return {
    guid: updatedProject.guid,
    userGuid: updatedProject.userGuid,
    name: updatedProject.name,
    planNumber: updatedProject.planNumber,
    factNumber: updatedProject.factNumber,
    createdAt: updatedProject.createdAt,
    updatedAt: updatedProject.updatedAt,
  };
});