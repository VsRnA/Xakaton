import { env } from "#infrastructure/env";
import { SequelizeDB } from "./sequelize";

export default new SequelizeDB({
  username: env.get('POSTGRES_USER'),
  password: env.get('POSTGRES_PASSWORD'),
  database: env.get('POSTGRES_DB'),
  host: env.get('POSTGRES_HOST'),
  port: env.get('POSTGRES_PORT'),
  logging: false,
  dialectOptions: {
    collate: 'ru_RU.UTF-8',
  },
  dialect: 'postgres',
  define: {
    charset: 'ru_RU.UTF-8',
  },
});
