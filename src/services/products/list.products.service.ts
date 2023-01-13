import { Product } from '../../../domain/entities/product.model';

import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

import { IQuery } from '../../../domain/entities/query.model';

export type IListProducts = (query: IQuery) => Promise<Product[]>;

export const buildListProducts = ({
	productsRepo
}: {
	productsRepo: IProductsRepo;
}): IListProducts => {
	return query => {
		return productsRepo.find(query);
	};
};