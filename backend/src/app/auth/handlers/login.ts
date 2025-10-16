import { httpTransport } from "#infrastructure/fastify";
import getUser from '#app/user/repositories/get';
import loginUserSchema from '#app/auth/schemas/login';
import { verifyPassword } from "#app/auth/services/verifyPassword";
import { generateToken } from "#app/auth/services/generateToken";
import { UnauthorizedError } from "#lib/http/errors";

httpTransport.handler.post('/api/auth/v1/login', loginUserSchema, async (req) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await getUser({ email });
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Неверный пароль');
  }
  const token = await generateToken(user.guid);
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
});