import { httpTransport } from "#infrastructure/fastify";
import findUserByEmail from '#app/user/repositories/findByEmail';
import getUser from '#app/user/repositories/get';
import getRole from '#app/role/repositories/get';
import createUser from '#app/user/repositories/create';
import createUserSchema from '#app/user/schemas/create';
import { hashPassword } from "#app/user/services/hashPassword";
import { ConflictError} from "#lib/http/errors";
import UserRoleAssigmentCreate from '#app/userRole/repositories/create';

httpTransport.handler.post('/api/user/v1', createUserSchema, async (req) => {
  const { password, roleId, managerGuid, ...userData } = req.body;
  const existedUser = await findUserByEmail(userData.email);

  if (existedUser) {
    throw new ConflictError('Пользователь с таким email уже существует');
  }

  await getRole({ roleId });

  if (managerGuid) await getUser({ guid: managerGuid });

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
    roleId,
    managerGuid: managerGuid || null,
  });

  await UserRoleAssigmentCreate({
    userGuid: newUser.guid,
    roleId,
  })

  return {
    guid: newUser.guid,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    roleId: newUser.roleId,
    managerGuid: newUser.managerGuid,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
});
