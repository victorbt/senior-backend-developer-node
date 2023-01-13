import { StatusCodes } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/callback';

import { ICategoriesService } from '../../services/categories';

import { IControllerResponse } from '..';

export const buildListCategories = (service: ICategoriesService) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const categories = await service.listCategories(request.body);

		return {
			success: true,
			message: "Success",
			statusCode: StatusCodes.OK,
			body: {
				categories
			}
		};
	};
};