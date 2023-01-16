import {
	IQuery,
	Product
} from 'domain/entities/models';
import { Singleton, OnlyInstantiableByContainer, Inject } from "typescript-ioc";

import { ProductsRepo } from '../../infrastructure/repositories/products/products.repository';

import { buildListProducts, IListProducts } from './list.products.service';
import { buildInsertProducts, IInsertProducts } from './insert.products.service';
import { buildProductDetail, IProductDetail } from './detail.products.service';
import { buildUpdateProduct, IUpdateProduct } from './update.products.service';
import { buildDeleteProduct, IDeleteProduct } from './delete.products.service';
import { buildSearchProducts, ISearchProducts } from './search.products.service';

export interface IProductsService {
	productDetail: IProductDetail;
	listProducts: IListProducts;
	insertProducts: IInsertProducts;
	updateProduct: IUpdateProduct;
	deleteProduct: IDeleteProduct;
	searchProducts: ISearchProducts;
}

@Singleton
@OnlyInstantiableByContainer
export class ProductsService implements IProductsService {
	@Inject _productsRepo: ProductsRepo

	public productDetail = (query: IQuery) => buildProductDetail({ productsRepo: this._productsRepo })(query)
	public listProducts = (query: IQuery) => buildListProducts({ productsRepo: this._productsRepo })(query)
	public insertProducts = (products: Product[]) => buildInsertProducts({ productsRepo: this._productsRepo })(products)
	public updateProduct = (query: IQuery, product: Product) => buildUpdateProduct({ productsRepo: this._productsRepo })(query, product)
	public deleteProduct = (query: IQuery) => buildDeleteProduct({ productsRepo: this._productsRepo })(query)
	public searchProducts = (text: string) => buildSearchProducts({ productsRepo: this._productsRepo })(text)
}

