import { IProduct } from '../../../domain/entities/product.model';

import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

import { IQuery } from '../../../domain/entities/query.model';

export type IListProducts = (query: IQuery) => Promise<IProduct[]>;

export const buildListProducts = ({
	productsRepo
}: {
	productsRepo: IProductsRepo;
}): IListProducts => {
	return async query => {
		return await productsRepo.find(query);
	};
};