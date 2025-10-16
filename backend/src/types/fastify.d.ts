import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    context: {
      user: {
        guid: string;
        email: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    };
  }
}
