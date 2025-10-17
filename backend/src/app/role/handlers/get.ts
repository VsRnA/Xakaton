import { httpTransport } from "#infrastructure/fastify";
import RoleGetSchema from '#app/role/schemas/get';
import getRole from '#app/role/repositories/get';

httpTransport.handler.get('/api/role/v1/:id', RoleGetSchema, async (req) => {
  const { id } = req.params;

  const role = await getRole({ roleId: Number(id) });

  return role;
});