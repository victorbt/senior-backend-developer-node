import { Request as expressReq } from "express"; 
import { Controller, Route, Get, Post, Put, Delete, Request, SuccessResponse, Tags, Example } from "tsoa";

import { buildCategoriesRepo, ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';
import { buildCategoriesService, ICategoriesService } from '../../services/categories';

import { buildListCategories } from './list.categories.controller';
// import { buildCategoryDetail } from './detail.categories.controller';
// import { buildInsertCategories } from './insert.categories.controller';
// import { buildDeleteCategory } from './delete.categories.controller';
// import { buildUpdateCategory } from './update.categories.controller';

// import { buildSearchCategories } from './search.categories.controller';


@Route("/v1/categories")
export class CategoriesControllers extends Controller {
  private readonly _categoriesRepo: ICategoriesRepo;
  private readonly _categoriesService: ICategoriesService;

  constructor() {
    super()
    this._categoriesRepo = buildCategoriesRepo()
    this._categoriesService = buildCategoriesService(this._categoriesRepo)
  }

  @Get("/")
  @Tags("Get")
  listCategories(
    @Request() req: Partial<expressReq>
  ): Promise<any> {
    return buildListCategories(this._categoriesService)(req)
  }


//   @Get('{categoryID}')
//   @Tags("Get")
//   categoryDetailF(
//     @Request() req: Partial<expressReq>
//   ): Promise<IControllerResponse> {
//     return buildCategoryDetail(this._categoriesService)(req)
//   }

//   public categoryDetail = async (
//     req: Partial<expressReq>
//   ) => {
//     return this.categoryDetailF.bind(this)(req)
//   }

//   @Post("/")
//   @Tags("Post", "Insert", "Create")
//   @SuccessResponse("201", "Created")
//   insertCategoriesF(
//     @Request() @Example({ name: "" }) req: any
//   ): Promise<IControllerResponse> {
//     return buildInsertCategories(this._categoriesService)(req)
//   }

//   public insertCategories = async (
//     req: Partial<expressReq>
//   ) => {
//     return this.insertCategoriesF.bind(this)(req)
//   }

//   @Put("/")
//   updateCategoryF(
//     @Request() req: any
//   ): Promise<IControllerResponse> {
//     return buildUpdateCategory(this._categoriesService)(req)
//   }

//   public updateCategory = async (
//     req: Partial<expressReq>
//   ) => {
//     return this.updateCategoryF.bind(this)(req)
//   }

//   @Delete("/")
//   deleteCategoryF(
//     @Request() req: any
//   ): Promise<IControllerResponse> {
//     return buildDeleteCategory(this._categoriesService)(req)
//   }

//   public deleteCategory = async (
//     req: Partial<expressReq>
//   ) => {
//     return this.deleteCategoryF.bind(this)(req)
//   }

//   @Post("/search")
//   searchCategoriesF(
//     @Request() req: any
//   ): Promise<IControllerResponse> {
//     return buildSearchCategories(this._categoriesService)(req)
//   }

//   public searchCategories = async (
//     req: Partial<IHttpRequest>
//   ) => {
//     return this.searchCategoriesF.bind(this)(req)
//   }

//   @Post("/find")
//   findCategoriesF(
//     @Request() req: any
//   ): Promise<IControllerResponse> {
//     return buildSearchCategories(this._categoriesService)(req)
//   }

//   public findCategories = async (
//     req: Partial<IHttpRequest>
//   ) => {
//     return this.findCategoriesF.bind(this)(req)
//   }

//   public getService = (): ICategoriesService => {
//     return this._categoriesService
//   }

//   public getRepo = (): ICategoriesRepo => {
//     return this._categoriesRepo
//   }
}
