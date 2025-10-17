import { httpTransport } from "#infrastructure/fastify";
import KpiListSchema from '#app/kpi/schemas/list';
import getKpiList from '#app/kpi/repositories/list';

httpTransport.handler.get('/api/kpi/v1/list', KpiListSchema, async (req) => {
  const { userGuid } = req.query;

  const kpis = await getKpiList({ userGuid });

  return kpis;
});