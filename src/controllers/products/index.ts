import { Controller, Route, Get, Post, Body, Request,Query, SuccessResponse } from "tsoa";

import { buildProductsRepo, IProductsRepo } from '../../infrastructure/repositories/products/products.repository';
import { buildProductsService, IProductsService } from '../../services/products';

import { buildListProducts } from './list.products.controller';
import { buildPostProducts } from './post.products.controller';
import { CustomController, IControllerResponse } from '..';

@Route("/v1/products")
export class ProductsControllers extends Controller {
  private readonly _productsRepo: IProductsRepo;
  private readonly _productsService: IProductsService;

  constructor() {
    super()
    this._productsRepo = buildProductsRepo()
    this._productsService = buildProductsService(this._productsRepo)
  }

  @Get("/")
  public async listProducts(
    @Request() req: any
  ): Promise<IControllerResponse> {
    let listProducts = buildListProducts(this._productsService)
    let response = await listProducts(req)

    return response
  }

  // @Post("/")
  // public async getUser(
  //   @Body() request: any
  // ): Promise<IControllerResponse> {

  //   const products = await this._productsService.listProducts(request.body);

  //   return {
  //     success: true,
  //     message: "Sucess",
  //     statusCode: 200,
  //     body: {
  //       products
  //     }
  //   };
  // }



  // @SuccessResponse("201", "Created")
  // @Post("/")
  public postProducts(): CustomController {
    return buildPostProducts(this._productsService)
  }

  // public postProducts(): Controller {
  //     return buildListProducts(this._productsService)
  // }

  public getService(): IProductsService {
    return this._productsService
  }

  public getRepo(): IProductsRepo {
    return this._productsRepo
  }
}
