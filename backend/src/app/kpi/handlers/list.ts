import { httpTransport } from "#infrastructure/fastify";
import KpiListSchema from '#app/kpi/schemas/list';
import getKpiList from '#app/kpi/repositories/list';

httpTransport.handler.get('/api/kpi/v1/list', KpiListSchema, async (req) => {
  const { userGuid } = req.query;

  const kpis = await getKpiList({ userGuid });

  // Расчет коэффициента KPI
  console.log(kpis);

  // Расчет общего процента выполнения
  const totalFactPercent =(kpis.reduce((sum, kpi) => sum + (Number(kpi.factPercent) || 0), 0)) / kpis.length;
  console.log(totalFactPercent);
  // Проверка условия 1: все фактические показатели больше плановых
  const allAbovePlan = kpis.every(kpi => Number(kpi.factPercent) > Number(kpi.planPercent));

  // Расчет коэффи  циента с учетом всех условий
  let coefficient = 0;
  console.log(allAbovePlan);
  if (allAbovePlan) {
    coefficient = 1;
  }

  if (totalFactPercent >= 101 && totalFactPercent <= 111) {
    coefficient = 1.1;
  } else if (totalFactPercent > 111) {
    coefficient = 1.2;
  }

  return {
    coefficient,
    statistics: kpis
  };

});