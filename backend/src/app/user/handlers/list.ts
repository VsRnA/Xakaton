import { httpTransport } from "#infrastructure/fastify";
import UserListSchema from '#app/user/schemas/list';
import getUserList from '#app/user/repositories/list';

httpTransport.handler.get('/api/user/v1/list', UserListSchema, async (req) => {
  const { roleId, managerGuid } = req.query;

  const users = await getUserList({ roleId, managerGuid });

  return users;
});