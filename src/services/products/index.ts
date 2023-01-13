import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

import { buildListProducts, IListProducts } from './list.products.service';
import { buildInsertProducts, IInsertProducts } from './insert.products.service';
import { buildproductDetail, IProductDetail } from './detail.products.service';
import { buildUpdateProduct, IUpdateProduct } from './update.products.service';
import { buildDeleteProduct, IDeleteProducts } from './delete.products.service';
import { buildSearchProducts, ISearchProducts } from './search.products.service';

export interface IProductsService {
	productDetail: IProductDetail;
	listProducts: IListProducts;
	insertProducts: IInsertProducts;
	updateProduct: IUpdateProduct;
	deleteProduct: IDeleteProducts;
	searchProducts: ISearchProducts;
}

export const buildProductsService = (productsRepo: IProductsRepo): IProductsService => {
	const productDetail = buildproductDetail({ productsRepo })
	const listProducts = buildListProducts({ productsRepo })
	const insertProducts = buildInsertProducts({ productsRepo })
	const updateProduct = buildUpdateProduct({ productsRepo })
	const deleteProduct = buildDeleteProduct({ productsRepo })
	const searchProducts = buildSearchProducts({ productsRepo })

	return {
		productDetail,
		listProducts,
		insertProducts,
		updateProduct,
		deleteProduct,
		searchProducts,
	};
};

