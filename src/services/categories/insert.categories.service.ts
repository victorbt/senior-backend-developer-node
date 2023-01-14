import { ICategory } from 'domain/entities/category.model';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IInsertCategories= (body: ICategory[]) => Promise<number[]>;

export const buildInsertCategories= ({
    categoriesRepo,
}: {
    categoriesRepo: ICategoriesRepo;
}): IInsertCategories=> {
    return async body => {
        //const bookData = validateBook(body);
        return categoriesRepo.insertMany(body)
    };
};
