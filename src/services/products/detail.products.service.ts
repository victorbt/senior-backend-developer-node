import { IProduct, IQuery } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IProductDetail = (query: IQuery) => Promise<IProduct>;

export const buildproductDetail = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IProductDetail => {
    return async query => {
        return productsRepo.findOne(query)
    };
};
