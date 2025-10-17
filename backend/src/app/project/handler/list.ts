import { httpTransport } from "#infrastructure/fastify";
import ProjectListSchema from '#app/project/schemas/list';
import getProjectList from '#app/project/repositories/list';

httpTransport.handler.get('/api/project/v1/list', ProjectListSchema, async (req) => {
  const { userGuid } = req.query;

  const projects = await getProjectList({ userGuid });

  return projects;
});