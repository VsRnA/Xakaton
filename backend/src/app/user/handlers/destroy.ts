import { httpTransport } from "#infrastructure/fastify";
import getUser from '#app/user/repositories/get';
import deleteUserByGuid from '#app/user/repositories/deleteByGuid';
import deleteUserSchema from '#app/user/schemas/delete';

httpTransport.handler.delete('/api/user/v1/:guid', deleteUserSchema, async (req) => {
  const { guid } = req.params;
  await getUser({ guid });
  await deleteUserByGuid(guid)
  return {}
});