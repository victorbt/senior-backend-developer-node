import { Product, IProduct } from '../../../../domain/entities/product.model';

import { collections, GetIncSequenceID, SequenceObj } from '../../../database/mongo.service';

import { Query } from '../../../../domain/entities/query.model';

export interface IProductsRepo {
	find: (query: Query) => Promise<Product[]>;
	findOne: (query: Query) => Promise<Product>;
	insertOne: (data: Product) => Promise<Product>;
	insertMany: (data: Product[]) => Promise<Product[]>;
	updateOne: (query: Query, data: Product) => Promise<Product>;
	deleteOne: (query: Query) => Promise<number>;
	search: (text: string) => Promise<Product[]>;
}

export class ProductsRepo implements IProductsRepo {
	find = async (query: Query) => {
		try {
			let filters = query.generateFilterElements()

			let findOperation = collections.products?.find<IProduct>(filters)

			if (query.sort && query.sort != '') {
				findOperation?.sort(query.sort)
			}

			return await findOperation?.skip(query.pagination.offset as number)
				.limit(query.pagination.limit as number)
				.toArray() as Product[];
		} catch (error) {
			throw (error)
		}
	};

	findOne = async (query: Query) => {
		try {
			let filters = query.generateFilterElements()
			return await collections.products?.findOne<IProduct>(filters) as Product;
		} catch (error) {
			throw (error)
		}
	};

	insertOne = async (data: IProduct) => {
		try {
			let seqObj: SequenceObj = await GetIncSequenceID('products', 1)

			data.id = seqObj.seq

			let filters = { "name": data.name }
			let foundProduct = await collections.products?.findOne<IProduct>(filters)
			if (foundProduct) throw new Error("Product already exists")
			await collections.products?.insertOne(data)

			return data
		} catch (error) {
			throw (error)
		}
	};

	insertMany = async (data: IProduct[]) => {
		try {
			let seqObj: SequenceObj = await GetIncSequenceID('products', data.length)

			data = data.map((product, i) => {
				product.id = seqObj.seq - (data.length - i)
				return product
			})


			let inserted = await collections.products?.insertMany(data)

			let insertedCound = inserted?.insertedCount as number;
			let insertedIDs = inserted?.insertedIds as {
				[key: number]: any;
			}

			let updatedIds: any[] = []

			for (let id in insertedIDs) {
				updatedIds.push(id)
			}

			if (updatedIds.length == 0 || data.length > insertedCound) {
				throw new Error("insert error");
			}

			return data
		} catch (error) {
			throw (error)
		}
	};

	updateOne = async (query: Query, data: Product) => {
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

	deleteOne = async (query: Query) => {
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

	search = async (text: string) => {
		try {
			return await (collections.products?.find<IProduct>(
				{ $text: { $search: text } },
				{ projection: { score: { $meta: "textScore" } } })
				.sort({ score: { $meta: "textScore" } })
				.toArray()) as Product[];
		} catch (error) {
			throw (error)
		}
	};

}
