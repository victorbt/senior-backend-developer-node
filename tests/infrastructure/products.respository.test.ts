import { expect } from "chai";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server"

import { Query, IQuery } from "../../domain/entities/query.model";

import { connectToDatabase } from "../../src/database/mongo.service";

import { IProductsRepo, buildProductsRepo } from "../../src/infrastructure/repositories/products/products.repository"

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
			connection = await connectToDatabase(uri)

			return await connection.db("mongo").collection("products").insertMany(fakeProducts())
		} catch (e: any) {
			console.log(e);
		}

		return
	});


	describe('list producst', () => {
		let productRepo: IProductsRepo;
		productRepo = buildProductsRepo()

		let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

		it('return products list', async () => {
			var result = await productRepo.find(query)
			expect(result).to.length(2)
			return
		});

		// it('throws error when invalid data is given', async () => {
		// 	try {
		// 		const invalidName = '';

		// 		await addBooks({ name: invalidName });
		// 	} catch (error) {
		// 		expect(error).toBeInstanceOf(ClientError);
		// 	}
		// });
	});

	after(async () => {
		await connection.close()
		await mongod.stop()
		return
	});

});
