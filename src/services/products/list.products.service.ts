import { Product,Query  } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IListProducts = (query: Query) => Promise<Product[]>;

export const buildListProducts = ({
	productsRepo
}: {
	productsRepo: IProductsRepo;
}): IListProducts => {
	return query => {
		return productsRepo.find(query);
	};
};