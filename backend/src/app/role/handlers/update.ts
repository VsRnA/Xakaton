import { httpTransport } from "#infrastructure/fastify";
import RoleUpdateSchema from '#app/role/schemas/update';
import updateRole from '#app/role/repositories/update';
import findRoleById from '#app/role/repositories/findById';
import findRoleByKeyWord from '#app/role/repositories/findByKeyword';
import { NotFoundError, ConflictError } from "#lib/http/errors";

httpTransport.handler.put('/api/role/v1/:id', RoleUpdateSchema, async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  // Проверка существования роли
  const existingRole = await findRoleById(Number(id));
  if (!existingRole) {
    throw new NotFoundError('Роль не найдена');
  }

  // Если обновляется keyWord, проверяем его уникальность
  if (updateData.keyWord && updateData.keyWord !== existingRole.keyWord) {
    const roleWithSameKeyWord = await findRoleByKeyWord(updateData.keyWord);
    if (roleWithSameKeyWord) {
      throw new ConflictError('Роль с таким ключевым словом уже существует');
    }
  }

  // Обновление роли
  console.log(updateData);
  const updatedRole = await updateRole(Number(id), updateData);
  return {
    id: updatedRole.id,
    name: updatedRole.name,
    keyWord: updatedRole.keyWord,
    createdAt: updatedRole.createdAt,
    updatedAt: updatedRole.updatedAt,
  };
});