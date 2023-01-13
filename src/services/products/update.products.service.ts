import { Product } from '../../../domain/entities/product.model';
import { IQuery } from '../../../domain/entities/query.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IUpdateProduct = (query: IQuery, product: Product) => Promise<Product>;

export const buildUpdateProduct = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IUpdateProduct => {
    return async (query, product) => {
        return productsRepo.updateOne(query, product)
    };
};
