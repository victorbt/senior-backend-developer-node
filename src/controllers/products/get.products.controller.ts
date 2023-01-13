import { Controller, Route, Get, Post, SuccessResponse } from "tsoa";

import { StatusCodes } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/callback';

import { IProductsService } from '../../services/products';

import { IControllerResponse } from '..';


export const buildGetProducts = (service: IProductsService) => {
    return async (
        request: Partial<IHttpRequest>,
    ): Promise<IControllerResponse> => {
        let productId: string = request.params ? request.params?.['id'] : "0";
        let productID = parseInt(productId);
        const products = await service.productDetail(productID);

        return {
            success: true,
            message: "Sucess",
            statusCode: StatusCodes.OK,
            body: {
                products
            }
        };
    };
};