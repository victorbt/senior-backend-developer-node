import { IProduct } from '../../../domain/entities/product.model';
import { IQuery } from '../../../domain/entities/query.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IUpdateProduct = (query: IQuery, product: IProduct) => Promise<IProduct>;

export const buildUpdateProduct = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IUpdateProduct => {
    return async (query,product) => {
        //const bookData = validateBook(body);
        return productsRepo.updateOne(query, product)
    };
};
