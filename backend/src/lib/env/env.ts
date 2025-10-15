import Ajv from 'ajv';
import { JSONSchema, SchemaToType } from '#types/jsonSchema';

const ajv = new Ajv(
  {
    allErrors: true,
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
  },
);

export class Env<T extends JSONSchema> {
  schema:T;
  validateObject: SchemaToType<T>;
  constructor(schema: T, envObject: Record<string, unknown>) {
    this.schema = schema;
    this.validateObject = { ...envObject } as SchemaToType<T>;
  }

  init() {
    console.log('Loading environment variables...');
    const validate = ajv.compile(this.schema);
    if (!validate(this.validateObject)) {
      throw new Error(JSON.stringify(validate.errors));
    }
  }

  get<Key extends keyof SchemaToType<T>>(name:Key) {
    return this.validateObject[name];
  }
}
