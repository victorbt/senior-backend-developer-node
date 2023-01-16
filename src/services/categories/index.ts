import {
	IQuery,
	Category
} from 'domain/entities/models';
import { Singleton, OnlyInstantiableByContainer, Inject } from "typescript-ioc";

import { CategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

import { buildListCategories, IListCategories } from './list.categories.service';
import { buildInsertCategories, IInsertCategories } from './insert.categories.service';
import { buildCategoryDetail, ICategoryDetail } from './detail.categories.service';
import { buildUpdateCategory, IUpdateCategory } from './update.categories.service';
import { buildDeleteCategory, IDeleteCategory } from './delete.categories.service';
import { buildSearchCategories, ISearchCategories } from './search.categories.service';

export interface ICategoriesService {
	categoryDetail: ICategoryDetail;
	listCategories: IListCategories;
	insertCategories: IInsertCategories;
	updateCategory: IUpdateCategory;
	deleteCategory: IDeleteCategory;
	searchCategories: ISearchCategories;
}

@Singleton
@OnlyInstantiableByContainer
export class CategoriesService implements ICategoriesService {
	@Inject _categoriesRepo: CategoriesRepo

	public categoryDetail = (query: IQuery) => buildCategoryDetail({ categoriesRepo: this._categoriesRepo })(query)
	public listCategories = (query: IQuery) => buildListCategories({ categoriesRepo: this._categoriesRepo })(query)
	public insertCategories = (categories: Category[]) => buildInsertCategories({ categoriesRepo: this._categoriesRepo })(categories)
	public updateCategory = (query: IQuery, category: Category) => buildUpdateCategory({ categoriesRepo: this._categoriesRepo })(query, category)
	public deleteCategory = (query: IQuery) => buildDeleteCategory({ categoriesRepo: this._categoriesRepo })(query)
	public searchCategories = (text: string) => buildSearchCategories({ categoriesRepo: this._categoriesRepo })(text)
}
