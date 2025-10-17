import { httpTransport } from "#infrastructure/fastify";
import ProjectGetSchema from '#app/project/schemas/get';
import getProject from '#app/project/repositories/get';

httpTransport.handler.get('/api/project/v1/:guid', ProjectGetSchema, async (req) => {
  const { guid } = req.params;

  const project = await getProject({ guid });

  return project;
});