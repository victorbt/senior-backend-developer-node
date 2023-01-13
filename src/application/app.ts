import 'dotenv/config'

import cors from 'cors';

import bodyParser from 'body-parser';
import swaggerUI from "swagger-ui-express";

import express, {
  Response as ExResponse,
  Request as ExRequest,
  Application,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";

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
    await connectToDatabase(this.dbConf)
    await this.createExpressApi()
    this.serveAPIDocumentation(this.app);

    this.app.use(function notFoundHandler(_req, res: ExResponse) {
      res.status(404).send({
        message: "Not Found",
      });
    });

    this.app.use(function errorHandler(
      err: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      next();
    });
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

  private isAuth(req: any, res: any, next: any) {
    const auth = req.headers.authorization;
    if (auth === 'password') {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
  }

  private log(): void {
    console.log(`Server started at http://localhost:${this.apiConf.PORT}`);
    //Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ApiServerConfig.name);
  }

  public static new(): ServerApp {
    return new ServerApp();
  }
}

