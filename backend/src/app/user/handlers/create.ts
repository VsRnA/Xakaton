import { httpTransport } from "#infrastructure/fastify";
import findUserByEmail from '#app/user/repositories/findByEmail';
import createUser from '#app/user/repositories/create';
import createUserSchema from '#app/user/schemas/create';
import { hashPassword } from "#app/user/services/hashPassword";
import { ConflictError } from "#lib/http/errors";

httpTransport.handler.post('/api/user/v1', createUserSchema, async (req) => {
  const { password, ...userData } = req.body;

  const existedUser = await findUserByEmail(userData.email);

  if (existedUser) {
    throw new ConflictError('Пользователь с таким email уже существует');
  }

  const hashedPassword = await hashPassword(password);

  return createUser({
    ...userData,
    password: hashedPassword,
  });
});

