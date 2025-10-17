import { httpTransport } from "#infrastructure/fastify";
import KpiGetSchema from '#app/kpi/schemas/get';
import getKpi from '#app/kpi/repositories/get';

httpTransport.handler.get('/api/kpi/v1/:guid', KpiGetSchema, async (req) => {
  const { guid } = req.params;

  const kpi = await getKpi({ guid });

  return kpi;
});