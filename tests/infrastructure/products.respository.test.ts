import { DatabaseConfig } from "@application/config";
import { expect } from "chai";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server"

import { Query, IQuery } from "../../domain/entities/query.model";

import { connectToDatabase } from "../../src/database/mongo.service";

import { IProductsRepo, ProductsRepo } from "../../src/infrastructure/repositories/products/products.repository"

import { fakeProducts } from '../fixtures/products.fixture'

describe('Products Repository', () => {
	var mongod: MongoMemoryServer;
	var connection: MongoClient

	before(async () => {
		try {
			mongod = await MongoMemoryServer.create({
				binary: {
					version: "4.2.0"
				}
			});

			const uri = mongod.getUri();

			let dbConfig: DatabaseConfig = {
				MONGO_URI: uri
			}

			connection = await connectToDatabase(dbConfig)
		} catch (e: any) {
			console.log(e);
			throw e;
		}
	});


	describe('insert products', () => {
		let productRepo: IProductsRepo;
		productRepo = new ProductsRepo()

		afterEach(async () => {
			await connection.db("mongo").collection("products").drop()
		})

		let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

		it('insert One', async () => {
			let product = fakeProducts(1)[0]
			var result = await productRepo.insertOne(product)
			var productFound = await productRepo.find(query)
			expect(result.name).to.be.equals(product.name)
			expect(productFound).to.length(1)
		});

		it('insert Many', async () => {
			await productRepo.insertMany(fakeProducts(3))
			var products = await productRepo.find(query)
			expect(products).to.length(3)
		});
	});


	describe('get product detail', () => {
		let productRepo: IProductsRepo;
		productRepo = new ProductsRepo()
		let productID: number

		before(async () => {
			let products = fakeProducts(2)
			productID = products[0].id as number
			await connection.db("mongo").collection("products").insertMany(products)
		})

		after(async () => {
			await connection.db("mongo").collection("products").drop()
		})

		it('findOne', async () => {
			let query: IQuery = new Query([{ field: "id", operator: "$eq", value: productID }], { offset: 0, limit: 5 }, {})
			var product = await productRepo.findOne(query)
			expect(product.id).to.be.equal(productID)
		});
	});

	describe('list products', () => {
		let productRepo: IProductsRepo;
		productRepo = new ProductsRepo()

		before(async () => {
			await connection.db("mongo").collection("products").insertMany(fakeProducts(2))
		})

		after(async () => {
			await connection.db("mongo").collection("products").drop()
		})

		let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

		it('find', async () => {
			var result = await productRepo.find(query)
			expect(result).to.length(2)
			return
		});
	});


	// describe('update product', () => {
	// 	let productRepo: IProductsRepo;
	// 	productRepo = new ProductsRepo()

	// 	let productID: number

	// 	before(async () => {
	// 		let products = fakeProducts(2)
	// 		productID = products[0].id as number
	// 		await connection.db("mongo").collection("products").insertMany(products)
	// 	})

	// 	after(async () => {
	// 		await connection.db("mongo").collection("products").drop()
	// 	})

	// 	it('updateOne', async () => {
	// 		let products = fakeProducts(1)
	// 		let query: IQuery = new Query([{ field: "id", operator: "$eq", value: productID }], { offset: 0, limit: 5 }, {})
	// 		var result = await productRepo.updateOne(query, products[0])
	// 		query = new Query([{ field: "name", operator: "$eq", value: result.name }], { offset: 0, limit: 5 }, {})
	// 		var product = await productRepo.findOne(query)

	// 		expect(result.name).to.be.equal(products[0].name)
	// 		expect(product.name).to.be.equal(products[0].name)
	// 	});
	// });


	// describe('delete product', () => {
	// 	let productRepo: IProductsRepo;
	// 	productRepo = new ProductsRepo()

	// 	let productID: number

	// 	before(async () => {
	// 		let products = fakeProducts(2)
	// 		productID = products[0].id as number
	// 		await connection.db("mongo").collection("products").insertMany(products)
	// 	})

	// 	after(async () => {
	// 		await connection.db("mongo").collection("products").drop()
	// 	})

	// 	it('deleteProduct', async () => {
	// 		let query: IQuery = new Query([{ field: "id", operator: "$eq", value: productID }], { offset: 0, limit: 5 }, {})
	// 		var result = await productRepo.deleteOne(query)
	// 		expect(result).to.greaterThan(0)
	// 	});
	// });


	after(async () => {
		await connection.close()
		await mongod.stop()
		return
	});
});
