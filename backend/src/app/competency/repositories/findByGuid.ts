import Competency from '../models/competency';

/**
 * Поиск компетенции по GUID
 * @param guid - GUID компетенции
 * @returns Компетенция или null
 */
export default async function findCompetencyByGuid(guid: string): Promise<Competency | null> {
  return Competency.findByPk(guid);
}