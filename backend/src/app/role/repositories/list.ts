import Role, { RoleAttributes } from "../models/role";
import { plainify } from "#infrastructure/db/sequelize";

/**
 * Получение списка всех ролей
 * @returns массив ролей
 */
export default async function getRoleList(): Promise<RoleAttributes[]> {
  const roles = await Role.findAll({
    order: [['name', 'ASC']]
  });

  return plainify(roles);
}