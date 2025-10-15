import { httpTransport } from "#infrastructure/fastify";
import getUser from '#app/user/repositories/get';
import updateUser from '#app/user/repositories/update';
import findUserByEmail from '#app/user/repositories/findByEmail';
import updateUserSchema from '#app/user/schemas/update';
import { hashPassword } from "#app/user/services/hashPassword";
import { ConflictError } from "#lib/http/errors";

httpTransport.handler.put('/api/user/v1/:guid', updateUserSchema, async (req) => {
  const { guid } = req.params;
  const { password, email, ...userData } = req.body;

  const user = await getUser({ guid });

  if (email && email !== user.email) {
    const existedUser = await findUserByEmail(email);
    if (existedUser) {
      throw new ConflictError('Пользователь с таким email уже существует');
    }
  }

  const updateData: any = {
    ...userData,
    ...(email && { email }),
  };

  if (password) {
    updateData.password = await hashPassword(password);
  }

  await updateUser(guid, updateData);

  return {};
});