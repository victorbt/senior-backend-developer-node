import { Request } from 'express';

import { IProductsService } from '../../services/products';

import { Query} from '../../../domain/entities/query.model';

import { Product } from '../../../domain/entities/models';

type ProductData = Omit<Product, '_id' | 'id'>;

export const buildUpdateProduct = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<Product> => {
        let productId =  request.params?.['id'] as string
        let productID = parseInt(productId);

        let query = new Query([{ field: "id", operator: "$eq", value: productID }], {}, {});

        return await service.updateProduct(query, request.body as ProductData);
    };
};