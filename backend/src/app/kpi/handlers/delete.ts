import { httpTransport } from "#infrastructure/fastify";
import KpiDeleteSchema from '#app/kpi/schemas/delete';
import deleteKpi from '#app/kpi/repositories/delete';
import findKpiByGuid from '#app/kpi/repositories/findByGuid';
import { NotFoundError } from "#lib/http/errors";

httpTransport.handler.delete('/api/kpi/v1/:guid', KpiDeleteSchema, async (req) => {
  const { guid } = req.params;

  // Проверка существования KPI
  const existingKpi = await findKpiByGuid(guid);
  if (!existingKpi) {
    throw new NotFoundError('KPI не найден');
  }

  // Удаление KPI (soft delete)
  await deleteKpi(guid);
  
  return;
});