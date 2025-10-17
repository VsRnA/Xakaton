import { httpTransport } from "#infrastructure/fastify";
import { env } from "#infrastructure/env";
import db from "#infrastructure/db/index";
import '#app/user/handlers/create';
import '#app/user/handlers/get';
import '#app/auth/handlers/login'
import '#app/competency/handlers/create';
import '#app/competency/handlers/get';
import '#app/competency/handlers/list';
import '#app/kpi/handlers/create';
import '#app/kpi/handlers/get';
import '#app/kpi/handlers/list';
import '#app/kpi/handlers/update';
import '#app/development/handlers/list';
import '#app/development/handlers/create';

async function bootstrap() {
  env.init();

  await db.connectDatabase();

  await httpTransport.startServer();
}

bootstrap();
