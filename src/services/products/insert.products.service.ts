import { Product } from '../../../domain/entities/product.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IInsertProducts = (products: Product[]) => Promise<number[]>;

export const buildInsertProducts = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IInsertProducts => {
    return products => {
        return productsRepo.insertMany(products)
    };
};
