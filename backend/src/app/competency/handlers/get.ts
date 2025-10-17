import { httpTransport } from "#infrastructure/fastify";
import CompetencyGetSchema from '#app/competency/schemas/get';
import getCompetency from '#app/competency/repositories/get';

httpTransport.handler.get('/api/competency/v1/:guid', CompetencyGetSchema, async (req) => {
  const { guid } = req.params;

  const competency = await getCompetency({ guid });

  return competency;
});