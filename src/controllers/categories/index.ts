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

import { Category, IFilter } from '../../../domain/entities/models';

import { CategoriesService } from '../../services/categories';

import { ValidateError } from '../../errors/validate.error'

import { buildListCategories } from './list.categories.controller';
import { buildCategoryDetail } from './detail.categories.controller';
import { buildInsertCategories } from './insert.categories.controller';
import { buildDeleteCategory } from './delete.categories.controller';
import { buildUpdateCategory } from './update.categories.controller';
import { buildSearchCategories } from './search.categories.controller';

import { fakeCategories } from "../../../tests/fixtures/categories.fixture";

@Route('/api/v1/categories')
export class CategoriesControllers extends Controller {
  @Inject private _categoriesService: CategoriesService

  /**
   * @example offset 0
   * @example limit 20
   * @param badRequestResponse The responder function for a bad request response
   */
  @Get('/')
  @SuccessResponse("200", "") // Custom success response
  @Tags('Get')
  @Example<Category[]>(
    fakeCategories(2)
  )
  public async listCategories(
    @Request() req: expressReq,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() offset?: number,
    @Query() limit?: number,
    @Query() sort?: string
  ): Promise<{ categories: Category[] }> {
    if (offset && offset < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid offset value: must be greater than 0" })
    }

    if (limit && limit < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid limit value: must be greater than 0" })
    }

    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildListCategories(this._categoriesService)(req)
  }

  /**
  * @example categoryID 258
  * @param badRequestResponse The responder function for a bad request response
  */
  @Get('/{categoryID}')
  @Tags('Get')
  @Example<Category>(
    fakeCategories(1)[0]
  )
  public async categoryDetail(
    @Request() req: expressReq,
    @Path() categoryID: number,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<Category> {
    if (categoryID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid category ID: must be greater than 0" })
    }

    return buildCategoryDetail(this._categoriesService)(req)
  }

  @Post('/')
  @Tags('Post', 'Insert', 'Create')
  @SuccessResponse('201', 'Created')
  @Security("api_key")
  @Response<ValidateError>(422, "Validation Failed", {
    message: "Validation failed",
    name: "Category Schema Validation Failed",
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
  @Example<Category>(
    fakeCategories(1)[0]
  )
  public async insertCategories(
    @Body() categories: Category[],
    @Request() req: expressReq,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<any> {
    if (categories.length == 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty categories list" })
    }

    this.setStatus(201);

    return buildInsertCategories(this._categoriesService)(req)
  }

  @Put('/{categoryID}')
  @Security("api_key")
  @Example<Category>(
    fakeCategories(1)[0]
  )
  public async updateCategory(
    @Request() req: expressReq,
    @Path() categoryID: number,
    @Body() _: Category,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<any> {
    if (categoryID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid category ID: must be greater than 0" })
    }
    return buildUpdateCategory(this._categoriesService)(req)
  }

  @Delete('/{categoryID}')
  @Security("api_key")
  public async deleteCategory(
    @Request() req: expressReq,
    @Path() categoryID: number,
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
  ): Promise<void> {
    if (categoryID < 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid category ID: must be greater than 0" })
    }
    return buildDeleteCategory(this._categoriesService)(req)
  }


  // /**
  //  * @example sort price
  //  * @param searchText Description for the request body object
  //  * @example  { "text": "Coca Cola" }
  //  * @param badRequestResponse The responder function for a bad request response
  //  */
  @Post('/search')
  @SuccessResponse("200", "")
  @Example<Category[]>(
    fakeCategories(2)
  )
  public async searchCategories(
    @Request() req: expressReq,
    @Body() searchText: { text: string },
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() sort?: string,
  ): Promise<{ categories: Category[] }> {
    if (searchText.text.length <= 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty search text" })
    }


    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildSearchCategories(this._categoriesService)(req)
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
  @Example<Category[]>(
    fakeCategories(2)
  )
  public async findCategories(
    @Request() req: expressReq,
    @Body() query: { filters: IFilter[] },
    @Res() badRequestResponse: TsoaResponse<StatusCodes.BAD_REQUEST, { error: string }>,
    @Query() sort?: string,
  ): Promise<{ categories: Category[] }> {
    if (query.filters.length == 0) {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "empty filters list" })
    }

    if (sort && sort == "") {
      return badRequestResponse(StatusCodes.BAD_REQUEST, { error: "invalid sort value: can't be mpty" })
    }

    return buildListCategories(this._categoriesService)(req)
  }
}
