import DevelopmentPlan from '../models/development';

/**
 * Поиск плана развития по GUID
 * @param guid - GUID плана развития
 * @returns План развития или null
 */
export default async function findDevelopmentPlanByGuid(guid: string): Promise<DevelopmentPlan | null> {
  return DevelopmentPlan.findByPk(guid);
}