import Kpi, { KpiCreationAttributes } from '../models/kpi';

/**
 * Создание нового KPI
 * @param data - данные KPI
 * @returns созданный KPI
 */
export default async function createKpi(
  data: KpiCreationAttributes
): Promise<Kpi> {
  return Kpi.create(data);
}