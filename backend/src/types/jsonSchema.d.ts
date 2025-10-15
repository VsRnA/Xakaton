import { JSONSchema4 } from 'json-schema';

export type JSONSchema = JSONSchema4;

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }
type CombineRequired<R, T> = R & Omit<T, keyof R>;
type Nullable<T, S> = S extends { nullable: true } ? T | null : T;

export type SchemaToType<S extends JSONSchema | undefined> =
  S extends 'number' | 'integer' ? number :
  S extends 'string' ? string :
  S extends 'boolean' ? boolean :
  S extends { enum: readonly (infer E)[] } ? E :
  S extends { type: 'number' | 'integer' } ? Nullable<number, S> :
  S extends { type: 'string'} ? Nullable<string, S> :
  S extends { type: 'boolean' } ? Nullable<boolean, S> :
  S extends { type: 'array', items: infer I} ? Nullable<(I extends JSONSchema ? SchemaToType<I>[] : never), S> :
  S extends { type: 'array'} ? Nullable<any[], S> :
  S extends { type: 'object', properties: infer O, required?: readonly (infer R)[] } ? Nullable<((
    CombineRequired<
      OmitNever<{
        -readonly [K in keyof O]: O[K] extends { default: any } ? (O[K] extends JSONSchema ? SchemaToType<O[K]> : never)
          : R extends K ? (O[K] extends JSONSchema ? SchemaToType<O[K]> : never)
          : never
      }>,
      OmitNever<{
        -readonly [K in keyof O]?: O[K] extends JSONSchema ? SchemaToType<O[K]> : never
      }>
    >) extends infer U ? { [P in keyof U]: U[P] } : never), S> :
  S extends { type: 'object'} ? Nullable<Record<string, any>, S> :
  unknown;
