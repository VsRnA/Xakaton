import { httpTransport } from "#infrastructure/fastify";
import KpiUpdateSchema from '#app/kpi/schemas/update';
import updateKpi from '#app/kpi/repositories/update';
import findKpiByGuid from '#app/kpi/repositories/findByGuid';
import { NotFoundError } from "#lib/http/errors";

httpTransport.handler.put('/api/kpi/v1/:guid', KpiUpdateSchema, async (req) => {
  const { guid } = req.params;
  const updateData = req.body;

  // Проверка существования KPI
  const existingKpi = await findKpiByGuid(guid);
  if (!existingKpi) {
    throw new NotFoundError('KPI не найден');
  }

  // Обновление KPI
  const updatedKpi = await updateKpi(guid, updateData);

  return {
    guid: updatedKpi.guid,
    userGuid: updatedKpi.userGuid,
    name: updatedKpi.name,
    planPercent: updatedKpi.planPercent,
    factPercent: updatedKpi.factPercent,
    createdAt: updatedKpi.createdAt,
    updatedAt: updatedKpi.updatedAt,
  };
});