import { StatusCodes } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/callback';

import { IProductsService } from '../../services/products';

import { IControllerResponse } from '..';

export const buildProductDetail = (service: IProductsService) => {
    return async (
        request: Partial<IHttpRequest>,
    ): Promise<IControllerResponse> => {
        try {
            const product = await service.productDetail(request.body);

            return {
                success: true,
                message: "Sucess",
                statusCode: StatusCodes.OK,
                body: {
                    product: product
                }
            };

        } catch (e) {
            return {
                success: false,
                message: "Error",
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: {}
            };
        }

    };
};