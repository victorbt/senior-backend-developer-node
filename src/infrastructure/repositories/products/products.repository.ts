import { Product, IProduct } from '../../../../domain/entities/product.model';

import { collections } from '../../../database/mongo.service';

import { Query } from '../../../../domain/entities/query.model';

export interface IProductsRepo {
	find: (query: Query) => Promise<Product[]>;
	findOne: (query: Query) => Promise<Product>;
	insertOne: (data: Product) => Promise<number>;
	insertMany: (data: Product[]) => Promise<number[]>;
	updateOne: (query: Query, data: Product) => Promise<Product>;
	deleteOne: (query: Query) => Promise<number>;
	search: (text: string) => Promise<Product[]>;
}

export var productsRepo: IProductsRepo

export const buildProductsRepo = (): IProductsRepo => {
	if (productsRepo) {
		return productsRepo
	}

	const find = async (query: Query) => {
		try {
			let filters = query.generateFilterElements()
			return await collections.products?.find<IProduct>(filters).toArray() as Product[];
		} catch (error) {
			throw (error)
		}
	};

	const findOne = async (query: Query) => {
		try {
			let filters = query.generateFilterElements()
			return await collections.products?.findOne<IProduct>(filters) as Product;
		} catch (error) {
			throw (error)
		}
	};

	const insertOne = async (data: IProduct) => {
		try {
			// getNextID
			let id = 1

			let filters = { "name": data.name }
			let foundProduct = await collections.products?.findOne<IProduct>(filters)
			if (foundProduct) throw new Error("Product already exists")
			await collections.products?.insertOne(data)

			return id
		} catch (error) {
			throw (error)
		}
	};

	const insertMany = async (data: IProduct[]) => {
		try {
			let inserted = await collections.products?.insertMany(data)

			let insertedCound = inserted?.insertedCount as number;
			let insertedIDs = inserted?.insertedIds as {
				[key: number]: any;
			}

			let updatedIds: any[] = []

			for (let id in insertedIDs) {
				//console.log(insertedIDs[id])
				updatedIds.push(0)
			}

			if (updatedIds.length == 0) {
				throw new Error("insert error");
			}

			if (data.length > insertedCound) {
				return updatedIds
			}

			return updatedIds
		} catch (error) {
			throw (error)
		}
	};

	const updateOne = async (query: Query, data: Product) => {
		try {
			let filters = query.generateFilterElements()

			let update = await collections.products?.findOneAndUpdate(filters, { "$set": { data } })
			let updateStatus = update?.ok as number;
			if (updateStatus) {
				return data
			}

			let err = update?.lastErrorObject
			throw new Error("update error : " + err);
		} catch (error) {
			throw (error)
		}
	};

	const deleteOne = async (query: Query) => {
		try {
			let filters = query.generateFilterElements()
			let update = (await collections.products?.findOneAndDelete(filters))
			let updateStatus = update?.ok as number;
			if (updateStatus) {
				return updateStatus
			}

			let err = update?.lastErrorObject
			throw new Error("update error : " + err);
		} catch (error) {
			throw (error)
		}
	};

	const search = async (text: string) => {
		return await (collections.products?.find<IProduct>(
			{ $text: { $search: text } },
			{ projection: { score: { $meta: "textScore" } } })
			.sort({ score: { $meta: "textScore" } })
			.toArray()) as Product[];
	};

	productsRepo = {
		find,
		findOne,
		insertOne,
		insertMany,
		updateOne,
		deleteOne,
		search
	};

	return productsRepo
};

