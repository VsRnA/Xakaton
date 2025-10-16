import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Handler } from "./handler";
import { verifyToken } from "#app/auth/services/verifyToken";
import findUserByGuid from "#app/user/repositories/findByGuid";

export interface FastifyTransportConfig {
  port: number;
  host: string;
  logger: boolean;
  handlersPath?: string;
}

export class FastifyTransport {
  #app: FastifyInstance;
  #config: FastifyTransportConfig;
  handler: Handler;

  constructor (config: FastifyTransportConfig) {
    this.#config = config;
    this.#app = fastify({
      logger: this.#config.logger,
    })
    this.#setupContextMiddleware();
    this.handler = new Handler(this.#app)
  }

  #setupContextMiddleware() {
    this.#app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
      (request as any).context = {
        user: await this.#getUserFromRequest(request)
      };
    });
  }

  async #getUserFromRequest(request: FastifyRequest): Promise<any> {
    const token = request.headers.authorization?.replace('JWT ', '');
    if (!token) {
      return null;
    }

    const decoded = await verifyToken(token);
    
    // Получаем пользователя из БД по userId из токена
    const user = await findUserByGuid(decoded.userId);
    
    if (!user) {
      return null;
    }

    // Возвращаем пользователя без пароля
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async startServer() {
    try {
      await this.#app.listen({
        port: this.#config.port,
        host: this.#config.host,
      })
      console.log(
        `Fastify server started at http://${this.#config.host}:${this.#config.port}`
      );
      console.log(this.#app.printRoutes()); 
    } catch (err) {
      this.#app.log.error(err);
      process.exit(1);
    }
  }
}
