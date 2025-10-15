import fastify, { FastifyInstance } from "fastify";
import { Handler } from "./handler";
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

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
    this.handler = new Handler(this.#app)
  }

  async #loadHandlers(basePath: string) {
    async function loadDirectory(dir: string) {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory() && entry === 'handlers') {
          const files = readdirSync(fullPath);
          
          for (const file of files) {
            if ((file.endsWith('.ts') || file.endsWith('.js')) && file !== 'index.ts' && file !== 'index.js') {
              await import(fullPath + '/' + file);
            }
          }
        } else if (stat.isDirectory()) {
          await loadDirectory(fullPath);
        }
      }
    }

    await loadDirectory(basePath);
  }

  async startServer() {
    try {
      if (this.#config.handlersPath) {
        await this.#loadHandlers(this.#config.handlersPath);
      }

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
