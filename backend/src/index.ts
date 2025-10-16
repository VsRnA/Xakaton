import { httpTransport } from "#infrastructure/fastify";
import { env } from "#infrastructure/env";
import db from "#infrastructure/db/index";
import '#app/user/handlers/create';
import '#app/user/handlers/destroy';
import '#app/user/handlers/get';
import '#app/user/handlers/update';
import '#app/auth/handlers/login'

async function bootstrap() {
  env.init();

  await db.connectDatabase();

  await httpTransport.startServer();
}

bootstrap();
