import { FastifyTransport } from "#lib/http/fastify";
import { config } from "#config";
import { join } from 'path';

export const httpTransport = new FastifyTransport({
  port: config.http.port,
  host: config.http.host,
  logger: config.http.logger,
  handlersPath: join(process.cwd(), 'src', 'app')
});
