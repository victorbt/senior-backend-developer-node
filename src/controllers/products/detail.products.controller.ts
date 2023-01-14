import { Request } from 'express'

import { Product, Query } from '../../../domain/entities/models'

import { IProductsService } from '../../services/products';

export const buildProductDetail = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Product> => {
        try {
            let productId: string = request.params ? request.params?.['id'] : "0";
            let productID = parseInt(productId);

            let query = new Query([{ field: "id", operator: "$eq", value: productID }], {}, {});

            return await service.productDetail(query);
        } catch (e) {
            throw e;
        }
    };
};