import Role from '../models/role';
import { NotFoundError } from "#lib/http/errors";

interface UpdateData {
  name?: string;
  keyWord?: string;
}

/**
 * Обновление роли
 * @param id - ID роли
 * @param data - данные для обновления
 * @returns обновленная роль
 */
export default async function updateRole(
  id: number,
  data: UpdateData
): Promise<Role> {
  const role = await Role.findByPk(id);

  if (!role) {
    throw new NotFoundError('Роль не найдена');
  }

  await role.update(data);

  return role;
}