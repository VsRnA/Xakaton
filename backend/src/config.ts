import { env } from '#infrastructure/env'

export const config = {
  http: {
    host: env.get('HTTP_HOST'),
    port: env.get('HTTP_PORT'),
    logger: false,
  },
  jwt: {
    secret: env.get('JWT_SECRET'),
  },
};
