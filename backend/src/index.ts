import { httpTransport } from "#infrastructure/fastify";
import { env } from "#infrastructure/env";
import db from "#infrastructure/db/index";

async function bootstrap() {
  env.init();

  await db.connectDatabase();

  await httpTransport.startServer();
}

bootstrap();
