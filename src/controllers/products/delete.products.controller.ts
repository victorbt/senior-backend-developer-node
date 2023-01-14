import { Request } from 'express'
import { IProductsService } from '../../services/products';

export const buildDeleteProduct = (service: IProductsService) => {
    return async (
        request: Partial<Request>,
    ): Promise<void> => {
        try {
            let ok = await service.deleteProduct(request.body);
            if (ok) {
                return
            }
        } catch (e) {
            throw e;
        }

    };
};