import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon'

import { Query, IQuery } from '../../domain/entities/query.model'

import { buildProductsRepo, IProductsRepo } from '../../src/infrastructure/repositories/products/products.repository';

import { buildListProducts, IListProducts } from '../../src/services/products/list.products.service'
import { buildProductDetail, IProductDetail } from '../../src/services/products/detail.products.service'
import { buildInsertProducts, IInsertProducts } from '../../src/services/products/insert.products.service'
import { buildUpdateProduct, IUpdateProduct } from '../../src/services/products/update.products.service'
import { buildDeleteProduct, IDeleteProduct } from '../../src/services/products/delete.products.service'

import { fakeProducts } from '../fixtures/products.fixture'


describe('Products Service Test', () => {
    let productsRepo: IProductsRepo;
    let sandbox: SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        productsRepo = buildProductsRepo()
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return inserted ids when repository return product', async () => {
        let insertProducts: IInsertProducts

        sandbox.stub(productsRepo, 'insertMany')
            .callsFake(() => Promise.resolve([1, 2, 3, 4]));

        insertProducts = await buildInsertProducts({ productsRepo })

        var products = await insertProducts(fakeProducts(4))

        expect(products).length(4)
    });

    it('should throw error in insert products when repository reject with error', async () => {
        let insertProducts: IInsertProducts

        sandbox.stub(productsRepo, 'insertMany')
            .rejects(new Error('mongo error'));

        insertProducts = await buildInsertProducts({ productsRepo })

        try {
            await insertProducts(fakeProducts(4))
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });


    it('should return product deatail when repository return product', async () => {
        let productDetail: IProductDetail
        let foundProduct = fakeProducts(1)[0]

        sandbox.stub(productsRepo, 'findOne')
            .callsFake(() => Promise.resolve(foundProduct));

        productDetail = await buildProductDetail({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var product = await productDetail(query)

        expect(product.name).to.be.equal(foundProduct.name)
    });

    it('should throw error in prodcut detail when repository reject with error', async () => {
        let productDetail: IProductDetail

        sandbox.stub(productsRepo, 'findOne')
            .rejects(new Error('mongo error'));

        productDetail = await buildProductDetail({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await productDetail(query)
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

    it('should return products when repository return products', async () => {
        let listProducts: IListProducts

        sandbox.stub(productsRepo, 'find')
            .callsFake(() => Promise.resolve(fakeProducts(2)));

        listProducts = await buildListProducts({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var products = await listProducts(query)

        expect(products).to.length(2)
    });


    it('should throw error in find when repository reject with error', async () => {
        let listProducts: IListProducts

        sandbox.stub(productsRepo, 'find')
            .rejects(new Error('mongo error'));

        listProducts = await buildListProducts({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await listProducts(query)
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

    it('should return updated product', async () => {
        let updateProduct: IUpdateProduct

        let newProduct = fakeProducts(1)[0]

        sandbox.stub(productsRepo, 'updateOne')
            .callsFake(() => Promise.resolve(newProduct));

        updateProduct = await buildUpdateProduct({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var product = await updateProduct(query, newProduct)

        expect(product.name).to.be.equal(newProduct.name)
    });


    it('should throw error in update when repository reject with error', async () => {
        let updateProduct: IUpdateProduct

        sandbox.stub(productsRepo, 'updateOne')
            .rejects(new Error('mongo error'));

        updateProduct = await buildUpdateProduct({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        try {
            await updateProduct(query, fakeProducts(1)[0])
        } catch (e) {
            expect(e).to.be.not.null
            expect((e as Error).message).to.be.equal('mongo error')
        }
    });

});

