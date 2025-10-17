import Role, { RoleCreationAttributes } from '../models/role';

/**
 * Создание новой роли
 * @param data - данные роли
 * @returns созданная роль
 */
export default async function createRole(
  data: RoleCreationAttributes
): Promise<Role> {
  return Role.create(data);
}