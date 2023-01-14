import { Query } from '../../../domain/entities/query.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IDeleteProduct = (query: Query) => Promise<number>;

export const buildDeleteProduct = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IDeleteProduct => {
    return async query => {
        return productsRepo.deleteOne(query)
    };
};
