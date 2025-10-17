import Project, { ProjectCreationAttributes } from '../models/project';

/**
 * Создание нового проекта
 * @param data - данные проекта
 * @returns созданный проект
 */
export default async function createProject(
  data: ProjectCreationAttributes
): Promise<Project> {
  return Project.create(data);
}