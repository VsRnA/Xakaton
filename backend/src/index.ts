import { httpTransport } from "#infrastructure/fastify";
import { env } from "#infrastructure/env";
import db from "#infrastructure/db/index";

import '#app/user/handlers/create';
import '#app/user/handlers/get';
import '#app/user/handlers/list';

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

import '#app/role/handlers/create';
import '#app/role/handlers/get';
import '#app/role/handlers/list';

import '#app/project/handler/create';
import '#app/project/handler/get';
import '#app/project/handler/list';
import '#app/project/handler/update';

async function bootstrap() {
  env.init();

  await db.connectDatabase();

  await httpTransport.startServer();
}

bootstrap();
