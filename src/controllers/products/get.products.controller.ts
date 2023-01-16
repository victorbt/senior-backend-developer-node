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

            let limit = 1000

            if (request.query?.limit) {
                limit = parseInt(request.query?.limit as string)
            };

            let offset = 0

            if (request.query?.limit) {
                offset = parseInt(request.query?.limit as string)
            };

            let sort = {}

            let query = new Query(filters, { offset, limit }, sort);

            return await service.listProducts(query);
        } catch (e) {
            throw e;

        }
    };
};