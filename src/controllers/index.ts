import { IHttpRequest } from '../helpers/callback';

export interface IControllerResponse  {
	success: boolean;
	message: string;
	statusCode: number;
	body: {
		[result: string]: any;
		error?: string;
	};
}

// export interface  ICustomController {  
// 	(request: Partial<IHttpRequest>) => Promise<IControllerResponse>
// }

export type CustomController = (
	request: Partial<IHttpRequest>,
) => Promise<IControllerResponse>;


export * from './products';
export * from './categories';