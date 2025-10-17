import { httpTransport } from "#infrastructure/fastify";
import RoleListSchema from '#app/role/schemas/list';
import getRoleList from '#app/role/repositories/list';

httpTransport.handler.get('/api/role/v1/list', RoleListSchema, async (req) => {
  const roles = await getRoleList();

  return roles;
});