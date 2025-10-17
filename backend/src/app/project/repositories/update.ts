import Project from '../models/project';
import { NotFoundError } from "#lib/http/errors";

interface UpdateData {
  name?: string;
  planNumber?: number;
  factNumber?: number;
}

/**
 * Обновление проекта
 * @param guid - GUID проекта
 * @param data - данные для обновления
 * @returns обновленный проект
 */
export default async function updateProject(
  guid: string,
  data: UpdateData
): Promise<Project> {
  const project = await Project.findByPk(guid);

  if (!project) {
    throw new NotFoundError('Проект не найден');
  }

  await project.update(data);

  return project;
}