// import { StatusCodes } from 'http-status-codes';
// import { IHttpRequest } from '../../helpers/callback';

// import { ICategoriesService } from '../../services/categories';

// import { IControllerResponse } from '..';

// export const buildSearchCategories = (service: ICategoriesService) => {
//     return async (
//         request: Partial<IHttpRequest>,
//     ): Promise<IControllerResponse> => {
//         let text: string = request.body['text']
//         const categories = await service.searchCategories(text);

//         return {
//             success: true,
//             message: "Sucess",
//             statusCode: StatusCodes.OK,
//             body: {
//                 categories
//             }
//         };
//     };
// };