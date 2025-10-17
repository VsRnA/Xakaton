import { WhereOptions } from "sequelize";
import User, { UserAttributes } from "../models/user";
import Role from "#app/role/models/role";
import { plainify } from "#infrastructure/db/sequelize";

interface GetListQuery {
  roleId?: UserAttributes['roleId'];
  managerGuid?: UserAttributes['managerGuid'];
}

interface UserWithRelations extends UserAttributes {
  role?: {
    id: number;
    name: string;
    keyWord: string;
  };
  manager?: {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Получение списка пользователей с фильтрацией
 * @param query - фильтры для поиска
 * @returns массив пользователей с ролями и менеджерами
 */
export default async function getUserList(query: GetListQuery = {}): Promise<UserWithRelations[]> {
  const where: WhereOptions<User> = {};

  if (query.roleId) {
    where.roleId = query.roleId;
  }

  if (query.managerGuid) {
    where.managerGuid = query.managerGuid;
  }

  const users = await User.findAll({
    where,
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'keyWord']
      },
      {
        model: User,
        as: 'manager',
        required: false,
        attributes: ['guid', 'email', 'firstName', 'lastName']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return plainify(users) as unknown as UserWithRelations[];
}