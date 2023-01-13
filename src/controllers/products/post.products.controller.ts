import { StatusCodes } from 'http-status-codes';
import { IHttpRequest } from '../../../src/helpers/callback';

import { IProductsService } from '../../services/products';

import { IControllerResponse } from '..';

export const buildPostProducts = (service: IProductsService) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const IDs = await service.insertProducts(request.body);

		return {
			success: true,
            message: "Sucess",
			statusCode: StatusCodes.OK,
			body: {
				IDs,
			},
		};
	};
};