import { Product, Query } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IUpdateProduct = (query: Query, product: Product) => Promise<Product>;

export const buildUpdateProduct = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IUpdateProduct => {
    return async (query, product) => {
        return productsRepo.updateOne(query, product)
    };
};
