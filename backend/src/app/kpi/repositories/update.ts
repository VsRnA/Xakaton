import Kpi, { KpiAttributes } from '../models/kpi';
import { NotFoundError } from "#lib/http/errors";

interface UpdateData {
  name?: string;
  planPercent?: number;
  factPercent?: number;
}

/**
 * Обновление KPI
 * @param guid - GUID KPI
 * @param data - данные для обновления
 * @returns обновленный KPI
 */
export default async function updateKpi(
  guid: string,
  data: UpdateData
): Promise<Kpi> {
  const kpi = await Kpi.findByPk(guid);

  if (!kpi) {
    throw new NotFoundError('KPI не найден');
  }

  await kpi.update(data);

  return kpi;
}