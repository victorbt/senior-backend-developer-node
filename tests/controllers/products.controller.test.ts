import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { SinonSandbox, createSandbox } from 'sinon'

import { ServerApp } from '../../src/application/app';
// const faker = require('faker');

import { productsControllers } from '../../src/routes';

import { fakeProducts } from '../fixtures/products.fixture'

chai.use(chaiHttp);

describe('Products controller', () => {
    const serverApplication = ServerApp.new();

    let sandbox: SinonSandbox

    beforeEach(async () => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
    });

    it('Should return 200 when repository return products', async () => {
        let productsRepo = productsControllers.getRepo()
        sandbox.stub(productsRepo, 'find')
            .callsFake(() => Promise.resolve(fakeProducts()));


        let productsService = productsControllers.getService()
        sandbox.stub(productsService, 'listProducts')
            .callsFake(() => Promise.resolve(fakeProducts()));

        const res = await chai.request(serverApplication.getApp())
            .get(`/api/v1/products`)
        //   .set('x-application-id', 'test')
        //   .set('auth_user', userId);

        expect(res).have.status(200)
        expect(res.body).be.a('object');
        expect(res.body).have.property('body')
    });

    // it('Should return 400 when core return 400 ', async function testCase() {
    //     //     const orderId = faker.random.number();
    //     //     const userId = faker.random.number();
    //     //     const from = '2020-07-01 15:00:00';

    //     //     const errorResponse = {
    //     //       response: { status: 400, data: { error: { code: '400', message: 'Order not exists' } } },
    //     //     };
    //     //     this.sandbox.stub(OrdersResource, 'reschedule')
    //     //       .rejects(errorResponse);

    //     //     const res = await chai.request(server)
    //     //       .post(`${URL_SERVICE}/${orderId}/reschedule/${from}`)
    //     //       .set('x-application-id', 'test')
    //     //       .set('auth_user', userId);

    //     //     res.should.have.status(400);
    // });


    //   it('Should return 404 when core return 404 ', async function testCase() {
    //     const orderId = faker.random.number();
    //     const userId = faker.random.number();
    //     const from = '2020-07-01 15:00:00';

    //     const errorResponse = {
    //       response: { status: 404, data: { error: { code: '404', message: 'Order not exists' } } },
    //     };
    //     this.sandbox.stub(OrdersResource, 'reschedule')
    //       .rejects(errorResponse);

    //     const res = await chai.request(server)
    //       .post(`${URL_SERVICE}/${orderId}/reschedule/${from}`)
    //       .set('x-application-id', 'test')
    //       .set('auth_user', userId);

    //     res.should.have.status(404);
    //   });
});

// describe('Get order Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should return 200', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const authorization = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getOrder').resolves('OK');

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}`)
//       .set('x-application-id', 'test')
//       .set('app-version-name', 'test')
//       .set('user-agent', 'test_agent')
//       .set('Authorization', authorization)
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });

//   it('Should return 500', async function testCase() {
//     const err = faker.random.word();
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const authorization = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getOrder').rejects(err);

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}`)
//       .set('x-application-id', 'test')
//       .set('app-version-name', 'test')
//       .set('user-agent', 'test_agent')
//       .set('Authorization', authorization)
//       .set('auth_user', userId);

//     res.should.have.status(500);
//   });
// });

// describe('Add product Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should return 200 when core return 200 ', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const products = {
//       products: [{
//         sale_type: 'U',
//         product_id: '6660086_4577',
//         units: 1,
//       }, {
//         units: 3,
//         sale_type: 'U',
//         product_id: '6660086_987974',
//       },
//       ],
//     };

//     this.sandbox.stub(CpgopsGatewayResource, 'isPossibleAddProducts')
//       .resolves();
//     this.sandbox.stub(OrdersResource, 'addProducts')
//       .resolves('OK');

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products/add`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(200);
//   });

//   it('Should return 400 when is not possible add products', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const errorResponse = {
//       error: {
//         message: 'operation error',
//         code: faker.random.number(),
//       },
//     };
//     const products = {
//       products: [{
//         sale_type: 'U',
//         product_id: '6660086_4577',
//         units: 1,
//       }, {
//         units: 3,
//         sale_type: 'U',
//         product_id: '6660086_987974',
//       },
//       ],
//     };

//     this.sandbox.stub(CpgopsGatewayResource, 'isPossibleAddProducts')
//       .rejects(errorResponse);

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products/add`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(400);
//     res.text.should.be.equal(errorResponse.error.message);
//   });

//   it('Should return error when add products fail', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();

//     const errorResponse = { response: { status: 404, data: { error: { message: 'not found' } } } };
//     const products = {
//       products: [{
//         sale_type: 'U',
//         product_id: '6660086_4577',
//         units: 1,
//       }, {
//         units: 3,
//         sale_type: 'U',
//         product_id: '6660086_987974',
//       },
//       ],
//     };

//     this.sandbox.stub(CpgopsGatewayResource, 'isPossibleAddProducts')
//       .resolves();
//     this.sandbox.stub(OrdersResource, 'addProducts')
//       .rejects(errorResponse);

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products/add`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(errorResponse.response.status);
//   });

//   it('Should return unexpected error when add products fail without error message', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const errorResponse = { response: { status: 404, data: {} } };
//     const products = {
//       products: [{
//         sale_type: 'U',
//         product_id: '6660086_4577',
//         units: 1,
//       }, {
//         units: 3,
//         sale_type: 'U',
//         product_id: '6660086_987974',
//       },
//       ],
//     };

//     this.sandbox.stub(CpgopsGatewayResource, 'isPossibleAddProducts')
//       .resolves();
//     this.sandbox.stub(OrdersResource, 'addProducts')
//       .rejects(errorResponse);

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products/add`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(500);
//   });
// });

// describe('update product Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should error when products is empty ', async () => {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const products = {
//       products: [],
//     };

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(400);
//   });

//   it('Should return 403 when the shopper is in store', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const products = {
//       products: [{
//         sale_type: 'U',
//         product_id: '6660086_4577',
//         units: 1,
//       }, {
//         units: 3,
//         sale_type: 'U',
//         product_id: '6660086_987974',
//       },
//       ],
//     };

//     this.sandbox.stub(OrdersResource, 'getOrderModifications')
//       .resolves(OrdersFixture.getModificationsWithShopper());

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send(products);

//     res.should.have.status(403);
//   });

//   it('Should return 200 when the shopper is in store', async function testCase() {
//     const pCount = 10;
//     const orderId = faker.random.number();
//     const userId = faker.random.number();
//     const storeId = faker.random.number();
//     const pIds = [...Array(pCount)].map(() => String(faker.random.number()));
//     const products = pIds.map(p => ({ id: p, product_id: `${storeId}_${p}`, units: '2' }));
//     const updateProductQtyResponse = pIds.map(productId =>
//       ({
//         units: 2,
//         order_product_id: `op_${productId}`,
//         success: true,
//       }));
//     const orderProducts = products.map(product => ({
//       id: +product.id,
//       pivot: {
//         id: `op_${product.id}`,
//         units: '5',
//       },
//     }));

//     this.sandbox.stub(OrdersResource, 'getOrderModifications')
//       .resolves(OrdersFixture.getModificationsWithoutShopper());
//     this.sandbox.stub(OrdersResource, 'getOrderDetails')
//       .resolves([{ products: orderProducts }]);
//     this.sandbox.stub(OrdersResource, 'updateProductQty')
//       .resolves({ params: { products: updateProductQtyResponse } });

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/${orderId}/products`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId)
//       .send({ products });

//     res.should.have.status(200);
//   });
// });

// describe('get order release time Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('should return 200', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();

//     this.sandbox.stub(OrdersService, 'getOrderReleaseTime').resolves('OK');

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/release-time`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });

//   it('should return 500', async function testCase() {
//     const error = faker.random.word();
//     const orderId = faker.random.number();
//     const userId = faker.random.number();

//     this.sandbox.stub(OrdersService, 'getOrderReleaseTime').rejects(error);

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/release-time`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId);

//     res.should.have.status(500);
//   });
// });

// describe('get Order Status Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('should return 200', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.number();

//     this.sandbox.stub(OrdersService, 'getOrderStatus').resolves('OK');

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/status`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });

//   it('should return 500', async function testCase() {
//     const error = faker.random.word();
//     const orderId = faker.random.number();
//     const userId = faker.random.number();

//     this.sandbox.stub(OrdersService, 'getOrderStatus').rejects(error);

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/status`)
//       .set('x-application-id', 'test')
//       .set('auth_user', userId);

//     res.should.have.status(500);
//   });
// });

// describe('getPossibleStockoutProductsByOrder', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('should return 200', async function testCase() {
//     const orderId = faker.random.number();
//     const authorization = faker.random.word();
//     const userId = faker.random.number();
//     const language = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getPossibleStockoutProductsByOrder').resolves('OK');

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/order/${orderId}/products/stockouts`)
//       .set('x-application-id', 'test')
//       .set('user-agent', 'test_agent')
//       .set('Authorization', authorization)
//       .set('Language', language)
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });

//   it('should return 500', async function testCase() {
//     const error = faker.random.word();
//     const orderId = faker.random.number();
//     const authorization = faker.random.word();
//     const userId = faker.random.number();
//     const language = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getPossibleStockoutProductsByOrder').rejects(error);

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/order/${orderId}/products/stockouts`)
//       .set('x-application-id', 'test')
//       .set('user-agent', 'test_agent')
//       .set('Authorization', authorization)
//       .set('Language', language)
//       .set('auth_user', userId);

//     res.should.have.status(500);
//   });
// });

// describe('store configuration Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should return 200 when service return data', async function testCase() {
//     const storeId = faker.random.number();
//     const userId = faker.random.number();

//     const response = {
//       enable_modification: true,
//       enable_reschedule: true,
//     };
//     this.sandbox.stub(OrdersService, 'getStoreConfigurations')
//       .resolves(response);


//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/store-configuration/${storeId}`)
//       .set('x-application-id', 'test')
//       .set('app-version-name', 'test')
//       .set('user-agent', 'test_agent')
//       .set('auth_user', userId);

//     res.should.have.status(200);
//     res.body.enable_modification.should.be.equal(response.enable_modification);
//     res.body.enable_reschedule.should.be.equal(response.enable_reschedule);
//   });

//   it('Should return 200 when send app-version header', async function testCase() {
//     const storeId = faker.random.number();
//     const userId = faker.random.number();

//     const response = {
//       enable_modification: true,
//       enable_reschedule: true,
//     };
//     this.sandbox.stub(OrdersService, 'getStoreConfigurations')
//       .resolves(response);


//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/store-configuration/${storeId}`)
//       .set('x-application-id', 'test')
//       .set('app-version', 'test')
//       .set('user-agent', 'test_agent')
//       .set('auth_user', userId);

//     res.should.have.status(200);
//     res.body.enable_modification.should.be.equal(response.enable_modification);
//     res.body.enable_reschedule.should.be.equal(response.enable_reschedule);
//   });
// });

// describe('active order Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should return 200 when service return data', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.word();
//     const userAgent = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getAvailableOrderProducts')
//       .resolves({ products: [] });

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/modify`)
//       .set('x-application-id', 'test')
//       .set('app-version-name', 'test')
//       .set('user-agent', userAgent)
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });

//   it('Should return 200 when send except param', async function testCase() {
//     const orderId = faker.random.number();
//     const userId = faker.random.word();
//     const userAgent = faker.random.word();

//     this.sandbox.stub(OrdersService, 'getAvailableOrderProducts')
//       .resolves({ products: [] });

//     const res = await chai.request(server)
//       .get(`${URL_SERVICE}/${orderId}/modify`)
//       .query({ except: 'tobacco' })
//       .set('x-application-id', 'test')
//       .set('app-version-name', 'test')
//       .set('user-agent', userAgent)
//       .set('auth_user', userId);

//     res.should.have.status(200);
//   });
// });

// describe('order Event message Controller', () => {
//   beforeEach(function beforeEach() {
//     this.sandbox = sinon.createSandbox();
//   });
//   afterEach(function afterEach() {
//     this.sandbox.verifyAndRestore();
//   });

//   it('Should return 401 when dont send token', async () => {
//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/order/event-message`)
//       .set('x-application-id', 'test');

//     res.should.have.status(401);
//   });

//   it('Should return 401 when token is invalid', async () => {
//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/order/event-message`)
//       .set('x-application-id', 'test')
//       .set('API_KEY', 'test1');

//     res.should.have.status(401);
//   });

//   it('should return 200', async function testCase() {
//     const orderId = faker.random.number();
//     const orderEvent = faker.random.word();
//     const authorization = faker.random.word();

//     this.sandbox.stub(OrdersService, 'orderEventMessage').resolves('OK');

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/order/event-message`)
//       .set('x-application-id', 'test')
//       .set('API_KEY', API_KEY)
//       .set('Authorization', authorization)
//       .send({
//         order_id: orderId,
//         order_event: orderEvent,
//       });

//     res.should.have.status(200);
//   });

//   it('should return 500', async function testCase() {
//     const error = faker.random.word();
//     const orderId = faker.random.number();
//     const orderEvent = faker.random.word();
//     const authorization = faker.random.word();

//     this.sandbox.stub(OrdersService, 'orderEventMessage').rejects(error);

//     const res = await chai.request(server)
//       .post(`${URL_SERVICE}/order/event-message`)
//       .set('x-application-id', 'test')
//       .set('API_KEY', API_KEY)
//       .set('Authorization', authorization)
//       .send({
//         order_id: orderId,
//         order_event: orderEvent,
//       });

//     res.should.have.status(500);
//   });
// });
