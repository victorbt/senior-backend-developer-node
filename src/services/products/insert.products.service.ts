import { IProduct } from '../../../domain/entities/product.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IInsertProducts = (body: IProduct[]) => Promise<number[]>;

export const buildInsertProducts = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IInsertProducts => {
    return async body => {
        //const bookData = validateBook(body);
        return productsRepo.insertMany(body)
    };
};
