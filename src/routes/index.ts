import { Router } from 'express';

import { 
    ProductsControllers
 } from '../controllers'

 import { listProductsCallback } from './v1/products.callbacks';

const router: Router = Router();

export const productsControllers: ProductsControllers = new ProductsControllers();

router.route('/v1/products')
    .get(listProductsCallback(productsControllers));

export const MainRouter: Router = router;