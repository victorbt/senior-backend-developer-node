import { Request as expressReq } from "express"
import { Controller, Route, Get, Post, Put, Delete, Request, Body, SuccessResponse, Tags, Example } from 'tsoa';

import { Product } from '../../../domain/entities/product.model';

import { buildProductsRepo, IProductsRepo } from '../../infrastructure/repositories/products/products.repository';
import { ProductsService, IProductsService } from '../../services/products';

import { buildListProducts } from './list.products.controller';
import { buildProductDetail } from './detail.products.controller';
import { buildInsertProducts } from './insert.products.controller';
import { buildDeleteProduct } from './delete.products.controller';
import { buildUpdateProduct } from './update.products.controller';
import { buildSearchProducts } from './search.products.controller';

@Route('/api/v1/products')
export class ProductsControllers extends Controller {
  private readonly _productsRepo: IProductsRepo;
  private readonly _productsService: IProductsService;

  constructor() {
    super()
    this._productsRepo = buildProductsRepo()
    this._productsService = new ProductsService(this._productsRepo)
  }

  @Get('/')
  @Tags('Get')
  public async listProducts(
    @Request() req: expressReq,
  ): Promise<{ products: Product[] }> {
    return buildListProducts(this._productsService)(req)
  }

  @Get('/:productID')
  @Tags('Get')
  public async productDetail(
    @Request() req: expressReq
  ): Promise<any> {
    return buildProductDetail(this._productsService)(req)
  }

  @Post('/')
  @Tags('Post', 'Insert', 'Create')
  @SuccessResponse('201', 'Created')
  public async insertProducts(
    @Body() body: Product[],
    @Request() req: any
  ): Promise<any> {
    return buildInsertProducts(this._productsService)(req)
  }

  @Put('/:productID')
  public async updateProduct(
    @Request() req: expressReq
  ): Promise<any> {
    return buildUpdateProduct(this._productsService)(req)
  }

  @Delete('/:productID')
  public async deleteProduct(
    @Request() req: expressReq
  ): Promise<any> {
    return buildDeleteProduct(this._productsService)(req)
  }

  @Post('/search')
  public async searchProducts(
    @Request() req: any
  ): Promise<any> {
    return buildSearchProducts(this._productsService)(req)
  }

  @Post('/find')
  public async findProducts(
    @Request() req: any
  ): Promise<any> {
    return buildListProducts(this._productsService)(req)
  }

  public getService = (): IProductsService => {
    return this._productsService
  }

  public getRepo = (): IProductsRepo => {
    return this._productsRepo
  }
}
