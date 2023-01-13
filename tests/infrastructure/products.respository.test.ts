import { DatabaseConfig } from "@application/config";
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

			let dbConfig: DatabaseConfig = {
				MONGO_URI: uri
			}

			connection = await connectToDatabase(dbConfig)

			return await connection.db("mongo").collection("products").insertMany(fakeProducts())
		} catch (e: any) {
			console.log(e);
			throw e;
		}
	});


	describe('list products', () => {
		let productRepo: IProductsRepo;
		productRepo = buildProductsRepo()

		let query: IQuery = new Query([], { offset: 0, limit: 5 }, {})

		it('return products list', async () => {
			var result = await productRepo.find(query)
			expect(result).to.length(2)
			return
		});
	});

	after(async () => {
		await connection.close()
		await mongod.stop()
		return
	});

});
