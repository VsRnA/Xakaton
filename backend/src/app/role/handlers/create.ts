import { httpTransport } from "#infrastructure/fastify";
import RoleCreateSchema from '#app/role/schemas/create';
import createRole from '#app/role/repositories/create';
import findRoleByKeyWord from '#app/role/repositories/findByKeyword';
import { ConflictError } from "#lib/http/errors";

httpTransport.handler.post('/api/role/v1', RoleCreateSchema, async (req) => {
  const { keyWord, ...roleData } = req.body;

  // Проверка существования роли с таким keyWord
  const existingRole = await findRoleByKeyWord(keyWord);
  if (existingRole) {
    throw new ConflictError('Роль с таким ключевым словом уже существует');
  }

  // Создание роли
  const newRole = await createRole({
    keyWord,
    ...roleData,
  });
  
  return {
    id: newRole.id,
    name: newRole.name,
    keyWord: newRole.keyWord,
    createdAt: newRole.createdAt,
    updatedAt: newRole.updatedAt,
  };
});