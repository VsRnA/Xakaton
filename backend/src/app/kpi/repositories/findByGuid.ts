import Kpi from '../models/kpi';

/**
 * Поиск KPI по GUID
 * @param guid - GUID KPI
 * @returns KPI или null
 */
export default async function findKpiByGuid(guid: string): Promise<Kpi | null> {
  return Kpi.findByPk(guid);
}