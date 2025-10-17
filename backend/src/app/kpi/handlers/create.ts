import { httpTransport } from "#infrastructure/fastify";
import KpiCreateSchema from '#app/kpi/schemas/create';
import createKpi from '#app/kpi/repositories/create';
import findUserByGuid from '#app/user/repositories/findByGuid';
import { BadRequestError } from "#lib/http/errors";

httpTransport.handler.post('/api/kpi/v1', KpiCreateSchema, async (req) => {
  const { userGuid, ...kpiData } = req.body;

  // Проверка существования пользователя
  const user = await findUserByGuid(userGuid);
  if (!user) {
    throw new BadRequestError('Пользователь с указанным GUID не существует');
  }

  // Создание KPI
  const newKpi = await createKpi({
    userGuid,
    ...kpiData,
  });
  
  return {
    guid: newKpi.guid,
    userGuid: newKpi.userGuid,
    name: newKpi.name,
    planPercent: newKpi.planPercent,
    factPercent: newKpi.factPercent,
    createdAt: newKpi.createdAt,
    updatedAt: newKpi.updatedAt,
  };
});