import { IProduct } from '../../../domain/entities/product.model';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';

import { } from '../../routes/routes'

export type IInsertProducts = (products: IProduct[]) => Promise<number[]>;

export const buildInsertProducts = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IInsertProducts => {
    return products => {
        return productsRepo.insertMany(products)
    };
};
