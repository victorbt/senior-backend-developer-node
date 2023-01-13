import { IProduct, Query } from '../../../domain/entities/models';
import { IProductsRepo } from '../../infrastructure/repositories/products/products.repository';

export type IProductDetail = (id: number) => Promise<IProduct>;

export const buildproductDetail = ({
    productsRepo,
}: {
    productsRepo: IProductsRepo;
}): IProductDetail => {
    return async id => {
        console.log(id)
        //const bookData = validateBook(body);

        let query = new Query(
            [{
                field: "id",
                operator: "$eq",
                value: id
            }],
            {
                offset: 0,
                limit: 10
            },
            {}
        );

        return productsRepo.findOne(query)
    };
};
