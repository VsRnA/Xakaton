import { WhereOptions } from "sequelize";
import Project, { ProjectAttributes } from "../models/project";
import User from "#app/user/models/user";
import { NotFoundError } from "#lib/http/errors";
import { plainify } from "#infrastructure/db/sequelize";

interface GetQuery {
  guid: ProjectAttributes['guid'];
}

interface ProjectWithRelations extends ProjectAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
}

/**
 * Получение проекта по GUID со всеми связями
 * @param query - параметры поиска
 * @returns проект с пользователем
 */
export default async function getProject(query: GetQuery): Promise<ProjectWithRelations> {
  const where: WhereOptions<Project> = {};

  if (query.guid) where.guid = query.guid;

  const project = await Project.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId']
      }
    ]
  });

  if (!project) {
    throw new NotFoundError('Проект не найден');
  }

  return plainify(project) as unknown as ProjectWithRelations;
}