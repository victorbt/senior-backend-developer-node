import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { SinonSandbox, createSandbox } from 'sinon'
import { Container } from "typescript-ioc";

import { ServerApp } from '../../src/application/app';

import { fakeProducts } from '../fixtures/products.fixture'
import { ProductsService } from '../../src/services/products';

chai.use(chaiHttp);

describe('Products controller', () => {
    const serverApplication = ServerApp.new();

    let app = serverApplication.getApp()

    describe('Get paginated products', () => {
        let sandbox: SinonSandbox

        beforeEach(async () => {
            sandbox = createSandbox();
        });

        afterEach(() => {
            sandbox.verifyAndRestore();
        });

        it('Should return 200 when repository return products', async () => {
            sandbox.stub(Container.get(ProductsService), 'listProducts')
                .callsFake(() => Promise.resolve(fakeProducts(2)));

            const res = await chai.request(app)
                .get(`/api/v1/products`)

            expect(res).have.status(200)
            expect(res.body).be.a('object');
            expect(res.body).have.property('products')
        });

        it('Should return 500 server error when repository return error', async function testCase() {
            const errorResponse = {
                response: { status: 500, data: { error: { code: '500', message: 'mongo error' } } },
            };

            sandbox.stub(Container.get(ProductsService), 'listProducts')
                .rejects(errorResponse);

            const res = await chai.request(app)
                .get(`/api/v1/products`)

            expect(res).have.status(500);
        });
    });


    describe('Get Product detail', () => {
        let sandbox: SinonSandbox

        beforeEach(async () => {
            sandbox = createSandbox();
        });

        afterEach(() => {
            sandbox.verifyAndRestore();
        });


        it('Should return 200 when servicev return product detail', async function testCase() {
            sandbox.stub(Container.get(ProductsService), 'productDetail')
                .callsFake(() => Promise.resolve(fakeProducts(1)[0]));

            const res = await chai.request(app)
                .get(`/api/v1/products/1`)

            expect(res).have.status(200)
            expect(res.body).be.a('object');
            expect(res.body).have.property('name')
        });

        it('Should return 500 server error when service return error', async function testCase() {
            const errorResponse = {
                response: { status: 500, data: { error: { code: '500', message: 'mongo error' } } },
            };

            sandbox.stub(Container.get(ProductsService), 'productDetail')
                .rejects(errorResponse);

            const res = await chai.request(app)
                .get(`/api/v1/products/1`)

            expect(res).have.status(500);
        });

        it('Should return 400 bad request when validation failed', async function testCase() {
            const res = await chai.request(app)
                .get(`/api/v1/products/invalid`)

            expect(res).have.status(400);
        });
    });


    describe('Update Product', () => {
        let sandbox: SinonSandbox

        beforeEach(async () => {
            sandbox = createSandbox();
        });

        afterEach(() => {
            sandbox.verifyAndRestore();
        });

        it('Should return 200 when core return 200 ', async function testCase() {

        });

        it('Should return 400 when is not possible to update product', async function testCase() {

        });

    });

});

