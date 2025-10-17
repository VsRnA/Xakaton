import Competency, { CompetencyCreationAttributes } from '../models/competency';

/**
 * Создание новой компетенции
 * @param data - данные компетенции
 * @returns созданная компетенция
 */
export default async function createCompetency(
  data: CompetencyCreationAttributes
): Promise<Competency> {
  return Competency.create(data);
}