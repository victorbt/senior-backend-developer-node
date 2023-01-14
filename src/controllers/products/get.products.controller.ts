import { Request } from 'express'

import { Product, Query } from '../../../domain/entities/models'

import { IProductsService } from '../../services/products';

export const buildGetProducts = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Product[]> => {
        try {
            let filters = request.body;
            if (!request.body.filters) {
                filters = [];
            };

            let query = new Query(filters, { offset: 0, limit: 15 }, {});

            return await service.listProducts(query);
        } catch (e) {
            throw e;

        }
    };
};