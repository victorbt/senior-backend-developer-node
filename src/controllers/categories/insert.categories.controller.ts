// import { StatusCodes } from 'http-status-codes';
// import { IHttpRequest } from '../../helpers/callback';

// import { ICategoriesService } from '../../services/categories';

// import { IControllerResponse } from '..';

// export const buildInsertCategories = (service: ICategoriesService) => {
// 	return async (
// 		request: Partial<IHttpRequest>,
// 	): Promise<IControllerResponse> => {
// 		const isertedID = await service.insertCategories(request.body);

// 		return {
// 			success: true,
//             message: "Sucess",
// 			statusCode: StatusCodes.OK,
// 			body: {
// 				isertedID: isertedID,
// 			},
// 		};
// 	};
// };