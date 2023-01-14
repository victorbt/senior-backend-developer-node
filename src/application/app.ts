import 'dotenv/config'

import cors from 'cors';

import bodyParser from 'body-parser';
import swaggerUI from "swagger-ui-express";

import express, { Application, } from "express";

import { errorHandler } from '../handlers/error.handler'
import { notFoundHandler } from '../handlers/notfound.handler'

import swaggerDocument from '../../docs/swagger.json';

import {
  APIConfig,
  DBConfig,
  ApiServerConfig,
  DatabaseConfig,
} from './config';

import { connectToDatabase } from "../database/mongo.service"

import { RegisterRoutes } from "../routes/routes"

export class ServerApp {
  private apiConf: ApiServerConfig = APIConfig
  private dbConf: DatabaseConfig = DBConfig

  private app: Application = express();

  public async run(): Promise<void> {
    // Database
    await connectToDatabase(this.dbConf)

    // Server
    await this.createExpressApi()

    // Docs
    this.serveAPIDocumentation(this.app);

    // Handlers
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private async createExpressApi() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    RegisterRoutes(this.app)

    await this.app.listen(this.apiConf.PORT, this.apiConf.HOST, () => {
      this.log()
    }).on('error', (e) => console.log(e));
  }

  private serveAPIDocumentation(app: Application): void {
    app.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument, { explorer: true })
    );
  }

  public getApp(): Application {
    this.createExpressApi()
    return this.app
  }

  private log(): void {
    console.log(`Server started at http://localhost:${this.apiConf.PORT}`);
    //Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ApiServerConfig.name);
  }

  public static new(): ServerApp {
    return new ServerApp();
  }
}

