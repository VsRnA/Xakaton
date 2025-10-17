import DevelopmentPlan, { DevelopmentPlanCreationAttributes } from '../models/development';

/**
 * Создание нового плана развития
 * @param data - данные плана развития
 * @returns созданный план развития
 */
export default async function createDevelopmentPlan(
  data: DevelopmentPlanCreationAttributes
): Promise<DevelopmentPlan> {
  return DevelopmentPlan.create(data);
}