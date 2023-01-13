import { IProduct, IQuery } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IDeleteProducts = (query: IQuery) => Promise<number>;

export const buildDeleteProduct = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IDeleteProducts => {
    return async query => {
        //const bookData = validateBook(body);
        return productsRepo.deleteOne(query)
    };
};
