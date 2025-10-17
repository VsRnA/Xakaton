import { httpTransport } from "#infrastructure/fastify";
import CompetencyListSchema from '#app/competency/schemas/list';
import competencyList from '#app/competency/repositories/list';

httpTransport.handler.get('/api/competency/v1/list', CompetencyListSchema, async (req) => {
  const { userGuid } = req.query;

  const competencies = await competencyList({ userGuid });

  return competencies;
});