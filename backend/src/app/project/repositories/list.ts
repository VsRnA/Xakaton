import { WhereOptions } from "sequelize";
import Project, { ProjectAttributes } from "../models/project";
import User from "#app/user/models/user";
import { plainify } from "#infrastructure/db/sequelize";

interface GetListQuery {
  userGuid?: ProjectAttributes['userGuid'];
}

interface ProjectWithUser extends ProjectAttributes {
  user?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
  };
}

/**
 * Получение списка проектов по фильтрам
 * @param query - фильтры для поиска
 * @returns массив проектов с пользователями
 */
export default async function getProjectList(query: GetListQuery): Promise<ProjectWithUser[]> {
  const where: WhereOptions<Project> = {};

  if (query.userGuid) {
    where.userGuid = query.userGuid;
  }

  const projects = await Project.findAll({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['guid', 'email', 'firstName', 'lastName', 'roleId']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return plainify(projects) as unknown as ProjectWithUser[];
}