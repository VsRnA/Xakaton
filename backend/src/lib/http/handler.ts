import { 
  FastifyInstance, 
  FastifyReply, 
  FastifyRequest,
  HTTPMethods,
  FastifySchema,
} from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { HttpError } from "#lib/http/errors";

type InferSchemaType<T> = T extends object ? FromSchema<T> : never;

type TypedHandlerFn<TSchema extends FastifySchema> = (
  req: FastifyRequest<{
    Body: TSchema extends { body: infer B } ? InferSchemaType<B> : unknown;
    Querystring: TSchema extends { querystring: infer Q } ? InferSchemaType<Q> : unknown;
    Params: TSchema extends { params: infer P } ? InferSchemaType<P> : unknown;
    Headers: TSchema extends { headers: infer H } ? InferSchemaType<H> : unknown;
  }>
) => Promise<any> | any;

type HttpMethod = Extract<HTTPMethods, "GET" | "POST" | "PUT" | "DELETE">;

export class Handler {
  #app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.#app = app;
  }

  public get<TSchema extends FastifySchema>(
    path: string,
    schema: TSchema,
    handler: TypedHandlerFn<TSchema>
  ) {
    this.#registerRoute('GET', path, schema, handler);
  }

  public post<TSchema extends FastifySchema>(
    path: string,
    schema: TSchema,
    handler: TypedHandlerFn<TSchema>
  ) {
    this.#registerRoute('POST', path, schema, handler);
  }

  public put<TSchema extends FastifySchema>(
    path: string,
    schema: TSchema,
    handler: TypedHandlerFn<TSchema>
  ) {
    this.#registerRoute('PUT', path, schema, handler);
  }

  public delete<TSchema extends FastifySchema>(
    path: string,
    schema: TSchema,
    handler: TypedHandlerFn<TSchema>
  ) {
    this.#registerRoute('DELETE', path, schema, handler);
  }

  #registerRoute<TSchema extends FastifySchema>(
    method: HttpMethod,
    path: string,
    schema: TSchema,
    handler: TypedHandlerFn<TSchema>,
  ) {
    this.#app.route({
      method,
      url: path,
      schema,
      handler: async (req: FastifyRequest, reply: FastifyReply) => {
        try {
          const result = await handler(req as any);
          
          if (result === undefined || result === null) {
            return reply.status(204).send();
          }
          
          const successStatus = method === 'POST' || method === 'PUT' ? 201 : 200;
          return reply.status(successStatus).send(result);
          
        } catch (error) {
          if (error instanceof HttpError) {
            return reply.status(error.statusCode).send({
              error: error.name.replace('Error', ''),
              message: error.message,
              ...(error.code && { code: error.code })
            });
          }
          
          throw error;
        }
      },
    });
  }
}
