import { httpTransport } from "#infrastructure/fastify";
import getUser from '#app/user/repositories/get';
import getUserSchema from '#app/user/schemas/get';

httpTransport.handler.get('/api/user/v1/:guid', getUserSchema, async (req) => getUser(req.params));