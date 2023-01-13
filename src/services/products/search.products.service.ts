import { IProduct } from '../../../domain/entities/product.model';

import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type ISearchProducts = (text: string) => Promise<IProduct[]>;

export const buildSearchProducts = ({
	productsRepo
}: {
	productsRepo: IProductsRepo;
}): ISearchProducts => {
	return async text => {
		return await productsRepo.search(text);
	};
};