import { ICategory, Query } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type ICategoryDetail = (id: number) => Promise<ICategory>;

export const buildCategoryDetail = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): ICategoryDetail => {
    return async id => {
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

        return categoriesRepo.findOne(query)
    };
};
