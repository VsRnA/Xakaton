import Project from '../models/project';

/**
 * Поиск проекта по GUID
 * @param guid - GUID проекта
 * @returns Проект или null
 */
export default async function findProjectByGuid(guid: string): Promise<Project | null> {
  return Project.findByPk(guid);
}