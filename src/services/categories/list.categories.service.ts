import { Category,Query  } from '../../../domain/entities/models';
import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

export type IListCategories = (query: Query) => Promise<Category[]>;

export const buildListCategories = ({
	categoriesRepo
}: {
	categoriesRepo: ICategoriesRepo;
}): IListCategories => {
	return query => {
		return categoriesRepo.find(query);
	};
};