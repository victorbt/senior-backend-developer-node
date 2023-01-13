import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomController, IControllerResponse } from '../controllers';

import { ApiError } from '../errors/api.error';
// import { logger } from './logger';

export interface IHttpRequest {
	body: Request['body'];
	query: Request['query'];
	params: Request['params'];
	headers: Request['headers']
}

export const buildExpressCallback = (controller: CustomController) => {
	return async (req: Request, res: Response) => {
		try {
			const httpRequest = {
				body: req.body,
				query: req.query,
				params: req.params,
				headers: req.headers
			};
			const httpResponse: IControllerResponse = await controller(httpRequest);

			res.json(httpResponse.body);
		} catch (error) {
			//logger.log(error);

			const errorMessage =
				error instanceof ApiError ? error.message : 'server error';

			res.json({
				success: false,
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				body: {
					error: errorMessage,
				},
			});
		}
	};
};