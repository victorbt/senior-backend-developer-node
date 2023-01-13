import { Controller, Route, Get, Post, SuccessResponse } from "tsoa";

import { StatusCodes } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/callback';

import { IProductsService } from '../../services/products';

import { IControllerResponse } from '..';


export const buildListProducts = (service: IProductsService) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const products = await service.listProducts(request.body);

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