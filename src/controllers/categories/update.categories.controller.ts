// import { StatusCodes } from 'http-status-codes';
// import { IHttpRequest } from '../../helpers/callback';

// import { ICategoriesService } from '../../services/categories';
// import { Query, IFilter } from '../../../domain/entities/query.model';

// import { IControllerResponse } from '..';

// export const buildUpdateCategory = (service: ICategoriesService) => {
//     return async (
//         request: Partial<IHttpRequest>,
//     ): Promise<IControllerResponse> => {
//         let filters: IFilter[] = []
//         let query = new Query(filters, { offset: 0, limit: 0 }, {})

//         let category = await service.updateCategory(query, request.body);

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