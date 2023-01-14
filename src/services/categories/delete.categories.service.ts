import { IProduct, IQuery } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IDeleteCategories = (query: IQuery) => Promise<number>;

export const buildDeleteCategory = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IDeleteCategories => {
    return async query => {
        //const bookData = validateBook(body);
        return categoriesRepo.deleteOne(query)
    };
};
