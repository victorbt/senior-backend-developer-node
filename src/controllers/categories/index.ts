import { buildCategoriesRepo, ICategoriesRepo } from '../../infrastructure/repositories/categories/categories.repository';
import { buildCategoriesService, ICategoriesService } from '../../services/categories';

import { buildListCategories } from './list.categories.controller';
import { CustomController } from '..';

export class CategoriesControllers {
    private readonly _categoriesRepo: ICategoriesRepo;
    private readonly _categoriesService: ICategoriesService;

    constructor() {
        this._categoriesRepo = buildCategoriesRepo()
        this._categoriesService = buildCategoriesService(this._categoriesRepo)
    }

    public listCategories(): CustomController {
        return buildListCategories(this._categoriesService)
    }

    public getService(): ICategoriesService {
        return this._categoriesService
    }

    public getRepo(): ICategoriesRepo {
        return this._categoriesRepo
    }
}
