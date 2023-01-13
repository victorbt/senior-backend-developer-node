import { ProductsControllers } from '../../controllers/products';
import { buildExpressCallback } from '../../helpers/callback';

export const listProductsCallback = (controllers: ProductsControllers) => buildExpressCallback(controllers.listProducts)

