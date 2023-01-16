import { Request as expressReq } from "express";
import { Inject } from 'typescript-ioc';
import { StatusCodes } from 'http-status-codes';
import {
  Controller,
  Route,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  Query,
  Path,
  SuccessResponse,
  Response,
  Res,
  TsoaResponse,
  Tags,
  Example,
  Security
} from 'tsoa';

import { Product, IFilter } from '../../../domain/entities/models';

import { ProductsService } from '../../services/products';

import { ValidateError } from '../../errors/validate.error'

import { buildListProducts } from './list.products.controller';
import { buildProductDetail } from './detail.products.controller';
import { buildInsertProducts } from './insert.products.controller';
import { buildDeleteProduct } from './delete.products.controller';
import { buildUpdateProduct } from './update.products.controller';
import { buildSearchProducts } from './search.products.controller';

import { fakeProducts } from "../../../tests/fixtures/products.fixture";

@Route('/api/v1/products')
export class ProductsControllers extends Controller {
  @Inject private _productsService: ProductsService

  /**
   * @example offset 0
   * @example limit 20
   * @param badRequestResponse The responder function for a bad request response
   */
  @Get('/')
  @SuccessResponse("200", "") // Custom success response
  @Tags('Get')
  @Example<Product[]>(
    fakeProducts(2)
  )
  public async listProducts(
    @Request() req: expressReq,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() offset?: number,
    @Query() limit?: number,
    @Query() sort?: string
  ): Promise<{ products: Product[] }> {
    if (offset && offset < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid offset value: must be greater than 0" })
    }

    if (limit && limit < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid limit value: must be greater than 0" })
    }

    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildListProducts(this._productsService)(req)
  }

  /**
  * @example productID 258
  * @param badRequestResponse The responder function for a bad request response
  */
  @Get('/{productID}')
  @Tags('Get')
  @Example<Product>(
    fakeProducts(1)[0]
  )
  public async productDetail(
    @Request() req: expressReq,
    @Path() productID: number,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<Product> {
    if (productID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid product ID: must be greater than 0" })
    }

    return buildProductDetail(this._productsService)(req)
  }

  @Post('/')
  @Tags('Post', 'Insert', 'Create')
  @SuccessResponse('201', 'Created')
  @Security("api_key")
  @Response<ValidateError>(422, "Validation Failed", {
    message: "Validation failed",
    name: "Product Schema Validation Failed",
    status: 422,
    details: {
      "body.$0.name": {
        "message": "'name' is required"
      },
      "body.$0.description": {
        "message": "'description' is required"
      },
      "body.$0.vendor": {
        "message": "'vendor' is required"
      },
      "body.$0.image": {
        "message": "'image' is required"
      },
      "body.$0.price": {
        "message": "'price' is required"
      },
      "body.$0.categories": {
        "message": "'categories' is required"
      }
    }
  })
  @Example<Product>(
    fakeProducts(1)[0]
  )
  public async insertProducts(
    @Body() products: Product[],
    @Request() req: expressReq,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<any> {
    if (products.length == 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty products list" })
    }

    this.setStatus(201);

    return buildInsertProducts(this._productsService)(req)
  }

  @Put('/{productID}')
  @Security("api_key")
  @Example<Product>(
    fakeProducts(1)[0]
  )
  public async updateProduct(
    @Request() req: expressReq,
    @Path() productID: number,
    @Body() _: Product,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<any> {
    if (productID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid product ID: must be greater than 0" })
    }
    return buildUpdateProduct(this._productsService)(req)
  }

  @Delete('/{productID}')
  @Security("api_key")
  public async deleteProduct(
    @Request() req: expressReq,
    @Path() productID: number,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<void> {
    if (productID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid product ID: must be greater than 0" })
    }
    return buildDeleteProduct(this._productsService)(req)
  }


  // /**
  //  * @example sort price
  //  * @param searchText Description for the request body object
  //  * @example  { "text": "Coca Cola" }
  //  * @param badRequestResponse The responder function for a bad request response
  //  */
  @Post('/search')
  @SuccessResponse("200", "")
  @Example<Product[]>(
    fakeProducts(2)
  )
  public async searchProducts(
    @Request() req: expressReq,
    @Body() searchText: { text: string },
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() sort?: string,
  ): Promise<{ products: Product[] }> {
    if (searchText.text.length <= 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty search text" })
    }


    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildSearchProducts(this._productsService)(req)
  }


  // /**
  // * @param filters Description for the request body object
  // * @example {
  // *   "filters": [
  // *      {
  // *        "field": "name",
  // *        "operator":"$eq",
  // *        "value": Coca Cola
  // *      }
  // *    ]
  // * }
  // * @example {
  // *   "filters": [
  // *      {
  // *        "field": "id",
  // *        "operator":"$eq",
  // *        "value": [25,35,68]
  // *      }
  // *    ]
  // * }
  // * @example offset 0
  // * @example limit 20
  // * @example sort price
  // * @param badRequestResponse The responder function for a bad request response
  // * }
  // */
  @Post('/find')
  @SuccessResponse("200", "")
  @Example<Product[]>(
    fakeProducts(2)
  )
  public async findProducts(
    @Request() req: expressReq,
    @Body() query: { filters: IFilter[] },
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() sort?: string,
  ): Promise<{ products: Product[] }> {
    if (query.filters.length == 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty filters list" })
    }

    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildListProducts(this._productsService)(req)
  }
}
