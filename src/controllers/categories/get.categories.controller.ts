// import { Controller, Route, Get, Post, SuccessResponse } from "tsoa";

// import { StatusCodes } from 'http-status-codes';
// import { IHttpRequest } from '../../helpers/callback';

// import { ICategoriesService } from '../../services/categories';

// import { IControllerResponse } from '..';

// export const buildGetCategories = (service: ICategoriesService) => {
//     return async (
//         request: Partial<IHttpRequest>,
//     ): Promise<IControllerResponse> => {
//         let pategoryId: string = request.params ? request.params?.['id'] : "0";
//         let pategoryID = parseInt(pategoryId);
//         const category = await service.categoryDetail(pategoryID);

//         return {
//             success: true,
//             message: "Sucess",
//             statusCode: StatusCodes.OK,
//             body: {
//                 categories: [category]
//             }
//         };
//     };
// };