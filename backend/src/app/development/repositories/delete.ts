import DevelopmentPlan from '../models/development';
import { NotFoundError } from "#lib/http/errors";

/**
 * Удаление плана развития (soft delete)
 * @param guid - GUID плана развития
 */
export default async function deleteDevelopmentPlan(guid: string): Promise<void> {
  const developmentPlan = await DevelopmentPlan.findByPk(guid);

  if (!developmentPlan) {
    throw new NotFoundError('План развития не найден');
  }

  await developmentPlan.destroy();
}