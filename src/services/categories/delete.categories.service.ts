import { Query } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IDeleteCategory = (query: Query) => Promise<number>;

export const buildDeleteCategory = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IDeleteCategory => {
    return async query => {
        return categoriesRepo.deleteOne(query)
    };
};
