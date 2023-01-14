import { Request } from 'express';

import { IProductsService } from '../../services/products';

import { Query, IFilter } from '../../../domain/entities/query.model';

import { Product } from '../../../domain/entities/models';

export const buildUpdateProduct = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Product> => {
        let filters: IFilter[] = []
        let query = new Query(filters, { offset: 0, limit: 0 }, {})

        return await service.updateProduct(query, request.body as Product);
    };
};