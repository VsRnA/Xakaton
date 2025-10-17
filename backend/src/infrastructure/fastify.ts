import { FastifyTransport } from "#lib/http/fastify";
import { config } from "#config";

export const httpTransport = new FastifyTransport({
  port: config.http.port,
  host: config.http.host,
  logger: config.http.logger,
  handlersPath: 'backend/src/app'
});
