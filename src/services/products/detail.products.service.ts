import { Product, Query } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IProductDetail = (query: Query) => Promise<Product>;

export const buildProductDetail = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IProductDetail => {
    return async query => {
        return productsRepo.findOne(query)
    };
};
