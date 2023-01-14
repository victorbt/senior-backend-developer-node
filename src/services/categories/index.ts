import { ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';

import { buildListCategories, IListCategories } from './list.categories.service';
import { buildInsertCategories, IInsertCategories } from './insert.categories.service';
import { buildCategoryDetail, ICategoryDetail } from './detail.categories.service';
import { buildUpdateCategory, IUpdateCategory } from './update.categories.service';
import { buildDeleteCategory, IDeleteCategories } from './delete.categories.service';
import { buildSearchCategories, ISearchCategories } from './search.categories.service';


export interface ICategoriesService {
    categoryDetail: ICategoryDetail;
    listCategories: IListCategories;
    insertCategories: IInsertCategories;
    updateCategory: IUpdateCategory;
    deleteCategory: IDeleteCategories
    searchCategories: ISearchCategories
}

export const buildCategoriesService = (categoriesRepo: ICategoriesRepo): ICategoriesService => {
    const categoryDetail = buildCategoryDetail({ categoriesRepo })
    const listCategories = buildListCategories({ categoriesRepo })
    const insertCategories = buildInsertCategories({ categoriesRepo })
    const updateCategory = buildUpdateCategory({ categoriesRepo })
    const deleteCategory = buildDeleteCategory({ categoriesRepo })
    const searchCategories = buildSearchCategories({ categoriesRepo })
    
    return {
        categoryDetail,
        listCategories,
        insertCategories,
        updateCategory,
        deleteCategory,
        searchCategories,
    };
};

