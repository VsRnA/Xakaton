import Kpi from '../models/kpi';
import { NotFoundError } from "#lib/http/errors";

/**
 * Удаление KPI (soft delete)
 * @param guid - GUID KPI
 */
export default async function deleteKpi(guid: string): Promise<void> {
  const kpi = await Kpi.findByPk(guid);

  if (!kpi) {
    throw new NotFoundError('KPI не найден');
  }

  await kpi.destroy();
}