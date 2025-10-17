import Role from '../models/role';

/**
 * Поиск роли по ID
 * @param id - ID роли
 * @returns Роль или null
 */
export default async function findRoleById(id: number): Promise<Role | null> {
  return Role.findByPk(id);
}