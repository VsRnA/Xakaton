import * as dotenv from 'dotenv';
import { schema } from '#lib/env/schema';
import { Env } from '#lib/env/env';

dotenv.config({ path: '.env' });

export const env = new Env(schema, process.env);
