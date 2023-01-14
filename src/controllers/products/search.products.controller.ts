import { Request } from 'express';

import { IProductsService } from '../../services/products';

import { Product } from '../../../domain/entities/models';

export const buildSearchProducts = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<{ products: Product[] }> => {
        let text: string = request.body['text']

        return {
            products: await service.searchProducts(text)
        };
    };
};