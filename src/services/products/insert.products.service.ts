import { Container } from 'typescript-ioc'

import { nameFieldKey } from '../../../domain/constants/constants'

import { Product } from '../../../domain/entities/product.model';

import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';
import { CategoriesService } from '../../services/categories/index'

import { Query } from '../../../domain/entities/query.model'

export type IInsertProducts = (products: Product[]) => Promise<Product[]>;

type ReducedCategory = Pick<Product, typeof nameFieldKey>

export const buildInsertProducts = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IInsertProducts => {
    return async products => {
        let categories = Container.get(CategoriesService)._categoriesRepo.find(new Query([], {}, {}))
        let categoriesNames = await categories as ReducedCategory[]

        let categoriesNamesSet = new Set<string>();
        (await categoriesNames).map((c) => { categoriesNamesSet.add(c.name) })

        let productCategoriesNames = new Set<string>();
        (await products).map((p) => { p.categories.map((c) => productCategoriesNames.add(c)) })

        for (let pcn in productCategoriesNames) {
            if (!categoriesNamesSet.has(pcn)) {
                throw new Error("category name " + pcn + " doesn't exists in categories catalog");
            }
        }

        return productsRepo.insertMany(products)
    };
};
