import Role from '../models/role';

/**
 * Поиск роли по ключевому слову
 * @param keyWord - ключевое слово роли
 * @returns Роль или null
 */
export default async function findRoleByKeyWord(keyWord: string): Promise<Role | null> {
  return Role.findOne({ where: { keyWord } });
}