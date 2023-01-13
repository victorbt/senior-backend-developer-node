import { ObjectId } from "mongodb";

import { Product, IProduct } from '../../../../domain/entities/product.model';

import { collections } from '../../../database/mongo.service';

import { IQuery } from '../../../../domain/entities/query.model';

export interface IProductsRepo {
	find: (query: IQuery) => Promise<Product[]>;
	findOne: (query: IQuery) => Promise<Product>;
	insertOne: (data: IProduct) => Promise<number>;
	insertMany: (data: IProduct[]) => Promise<number[]>;
	updateOne: (query: IQuery, data: Product) => Promise<Product>;
	deleteOne: (query: IQuery) => Promise<number>;
	search: (text: string) => Promise<Product[]>;
}

export const buildProductsRepo = (): IProductsRepo => {
	const find = async (query: IQuery) => {
		try {
			let filters = query.generateFilterElements()
			return await collections.products?.find<IProduct>(filters).toArray() as Product[];
		} catch (error) {
			throw (error)
		}
	};

	const findOne = async (query: IQuery) => {
		try {
			let filters = query.generateFilterElements()
			return await collections.products?.findOne<IProduct>(filters) as Product;
		} catch (error) {
			throw (error)
		}
	};

	const insertOne = async (data: IProduct) => {
		try {
			let filters = { "name": data.name }
			let foundProduct = await collections.products?.findOne<IProduct>(filters)
			if (foundProduct) throw new Error("Product already exists")

			let update = await collections.products?.insertOne(data)

			let updateID = update?.insertedId as ObjectId

			return 0
		} catch (error) {
			throw (error)
		}
	};

	const insertMany = async (data: IProduct[]) => {
		try {
			let update = await collections.products?.insertMany(data)

			let updatedIDs = update?.insertedCount as number;
			if (updatedIDs) {
				return []
			}

			throw new Error("insert error");
		} catch (error) {
			throw (error)
		}
	};

	const updateOne = async (query: IQuery, data: IProduct) => {
		try {
			let filters = query.generateFilterElements()
			let update = (await collections.products?.findOneAndUpdate(filters, data))
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

	const deleteOne = async (query: IQuery) => {
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

	return {
		find,
		findOne,
		insertOne,
		insertMany,
		updateOne,
		deleteOne,
		search
	};
};

