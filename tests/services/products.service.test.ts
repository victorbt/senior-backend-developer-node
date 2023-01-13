import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon'

import { Query, IQuery } from '../../domain/entities/query.model'

import { buildProductsRepo, IProductsRepo } from '../../src/infrastructure/repositories/products/products.repository';

import { buildListProducts, IListProducts } from '../../src/services/products/list.products.service'

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

    it('should return products when resource return products', async () => {
        let listProducts: IListProducts

        sandbox.stub(productsRepo, 'find')
            .callsFake(() => Promise.resolve(fakeProducts()));

        listProducts = await buildListProducts({ productsRepo })

        let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

        var products = await listProducts(query)

        expect(products).to.length(2)
    });

    //   it('should return empty when products is empty ', async () => {
    //     const products = await ProductService.resolveProducts([], { except: 'tobacco' });

    //     products.length.should.be.equal(0);
    //   });

    //   it('should return empty when service reject with ProductsNotFoundError', async () => {
    //     this.sandbox.stub(ProductResource, 'resolveProducts')
    //       .rejects(new ProductsNotFoundError('No products found'));
    //     const products = await ProductService.resolveProducts(['3_1', '3_2'], { except: '' });

    //     products.length.should.be.equal(0);
    //   });
});

