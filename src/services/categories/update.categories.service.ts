import { ICategory } from 'domain/entities/category.model';
import { IQuery } from '../../../domain/entities/query.model';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IUpdateCategory = (query: IQuery, category: ICategory) => Promise<ICategory>;

export const buildUpdateCategory = ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IUpdateCategory => {
    return async (query,category) => {
        //const bookData = validateBook(body);
        return categoriesRepo.updateOne(query, category)
    };
};
