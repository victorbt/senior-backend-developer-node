import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";

import { ApiServerConfig } from './config/api.config';
import { DatabaseConfig } from './config/database.config';
import { connectToDatabase } from "../database/mongo.service"

import bodyParser from 'body-parser';

import { MainRouter } from "../routes"


export class ServerApp {

  private readonly host: string = ApiServerConfig.HOST;
  private readonly port: number = ApiServerConfig.PORT;
  private readonly mongoURI: string = DatabaseConfig.URI;

  private app: Application = express();

  public async run(): Promise<void> {

    await connectToDatabase(this.mongoURI)

    await this.buildExpressApi()

    this.buildAPIDocumentation(this.app);
  }

  private async buildExpressApi() {
    this.app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    this.app.use('/api', MainRouter)

    await this.app.listen(this.port, this.host, () => {
      this.log()
    }).on('error', (e) => console.log(e));
  }

  private buildAPIDocumentation(app: Application): void {
    app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
  }

  public getApp(): Application {
    this.buildExpressApi()
    return this.app
  }

  private log(): void {
    console.log(`Server started at http://localhost:${this.port}`);
    //Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ApiServerConfig.name);
  }

  public static new(): ServerApp {
    return new ServerApp();
  }
}

