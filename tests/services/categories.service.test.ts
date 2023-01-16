import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon'

import { Query, IQuery } from '../../domain/entities/query.model'

import { CategoriesRepo, ICategoriesRepo } from '../../src/infrastructure/repositories/categories/categories.repository';

import { buildListCategories, IListCategories } from '../../src/services/categories/list.categories.service'
import { buildCategoryDetail, ICategoryDetail } from '../../src/services/categories/detail.categories.service'
import { buildInsertCategories, IInsertCategories } from '../../src/services/categories/insert.categories.service'
import { buildUpdateCategory, IUpdateCategory } from '../../src/services/categories/update.categories.service'
import { buildDeleteCategory, IDeleteCategory } from '../../src/services/categories/delete.categories.service'
import { buildSearchCategories, ISearchCategories } from '../../src/services/categories/search.categories.service'


import { fakeCategories } from '../fixtures/categories.fixture'

describe('Categories Service Test', () => {
    let categoriesRepo: ICategoriesRepo;
    let sandbox: SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        categoriesRepo = new CategoriesRepo()
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return inserted categories when repository return inserted categories', async () => {
        let insertCategories: IInsertCategories

        sandbox.stub(categoriesRepo, 'insertMany')
            .callsFake(() => Promise.resolve(fakeCategories(4)));

        insertCategories = await buildInsertCategories({ categoriesRepo })

        var categories = await insertCategories(fakeCategories(4))

        expect(categories).length(4)
    });

    it('should throw error in insert categories when repository reject with error', async () => {
        let insertCategories: IInsertCategories

        sandbox.stub(categoriesRepo, 'insertMany')
            .rejects(new Error('mongo error'));

        insertCategories = await buildInsertCategories({ categoriesRepo })

        try {
            await insertCategories(fakeCategories(4))
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });


    it('should return category deatail when repository return category', async () => {
        let categoryDetail: ICategoryDetail
        let foundCategory = fakeCategories(1)[0]

        sandbox.stub(categoriesRepo, 'findOne')
            .callsFake(() => Promise.resolve(foundCategory));

        categoryDetail = await buildCategoryDetail({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var category = await categoryDetail(query)

        expect(category.name).to.be.equal(foundCategory.name)
    });

    it('should throw error in prodcut detail when repository reject with error', async () => {
        let categoryDetail: ICategoryDetail

        sandbox.stub(categoriesRepo, 'findOne')
            .rejects(new Error('mongo error'));

        categoryDetail = await buildCategoryDetail({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await categoryDetail(query)
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

    it('should return categories when repository return categories', async () => {
        let listCategories: IListCategories

        sandbox.stub(categoriesRepo, 'find')
            .callsFake(() => Promise.resolve(fakeCategories(2)));

        listCategories = await buildListCategories({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var categories = await listCategories(query)

        expect(categories).to.length(2)
    });


    it('should throw error in find when repository reject with error', async () => {
        let listCategories: IListCategories

        sandbox.stub(categoriesRepo, 'find')
            .rejects(new Error('mongo error'));

        listCategories = await buildListCategories({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await listCategories(query)
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

    it('should return updated category', async () => {
        let updateCategory: IUpdateCategory

        let newCategory = fakeCategories(1)[0]

        sandbox.stub(categoriesRepo, 'updateOne')
            .callsFake(() => Promise.resolve(newCategory));

        updateCategory = await buildUpdateCategory({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var category = await updateCategory(query, newCategory)

        expect(category.name).to.be.equal(newCategory.name)
    });


    it('should throw error in update when repository reject with error', async () => {
        let updateCategory: IUpdateCategory

        sandbox.stub(categoriesRepo, 'updateOne')
            .rejects(new Error('mongo error'));

        updateCategory = await buildUpdateCategory({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await updateCategory(query, fakeCategories(1)[0])
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });


    it('should return delete category', async () => {
        let deleteCategory: IDeleteCategory

        sandbox.stub(categoriesRepo, 'deleteOne')
            .callsFake(() => Promise.resolve(1));

        deleteCategory = await buildDeleteCategory({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var result = await deleteCategory(query)

        expect(result).to.be.equal(1)
    });

    it('should throw error in delete when repository reject with error', async () => {
        let deleteCategory: IDeleteCategory

        sandbox.stub(categoriesRepo, 'deleteOne')
            .rejects(new Error('mongo error'));

        deleteCategory = await buildDeleteCategory({ categoriesRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await deleteCategory(query)
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

    it('should return query match categories when repository return categories', async () => {
        let searchCategories: ISearchCategories

        sandbox.stub(categoriesRepo, 'search')
            .callsFake(() => Promise.resolve(fakeCategories(2)));

        searchCategories = await buildSearchCategories({ categoriesRepo })

        var categories = await searchCategories('category name')

        expect(categories).to.length(2)
    });

    it('should throw error in find when repository reject with error', async () => {
        let searchCategories: ISearchCategories

        sandbox.stub(categoriesRepo, 'search')
            .rejects(new Error('mongo error'));

        searchCategories = await buildSearchCategories({ categoriesRepo })

        try {
            await searchCategories("category name")
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

});

