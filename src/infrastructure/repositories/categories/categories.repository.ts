import { Category, ICategory } from '../../../../domain/entities/category.model';

import { collections, GetIncSequenceID, SequenceObj } from '../../../database/mongo.service';

import { Query } from '../../../../domain/entities/query.model';

export interface ICategoriesRepo {
    find: (query: Query) => Promise<Category[]>;
    findOne: (query: Query) => Promise<Category>;
    insertOne: (data: Category) => Promise<Category>;
    insertMany: (data: Category[]) => Promise<Category[]>;
    updateOne: (query: Query, data: Category) => Promise<Category>;
    deleteOne: (query: Query) => Promise<number>;
    search: (text: string) => Promise<Category[]>;
}

export class CategoriesRepo implements ICategoriesRepo {
    find = async (query: Query) => {
        try {
            let filters = query.generateFilterElements()
            return await collections.categories?.find<ICategory>(filters).toArray() as Category[];
        } catch (error) {
            throw (error)
        }
    };

    findOne = async (query: Query) => {
        try {
            let filters = query.generateFilterElements()
            return await collections.categories?.findOne<ICategory>(filters) as Category;
        } catch (error) {
            throw (error)
        }
    };

    insertOne = async (data: Category) => {
        try {
            let seqObj: SequenceObj = await GetIncSequenceID('products', 1)

            data.id = seqObj.seq

            let filters = { "name": data.name }
            let foundCategory = await collections.categories?.findOne<ICategory>(filters)
            if (foundCategory) throw new Error("Category already exists")
            await collections.categories?.insertOne(data)

            return data
        } catch (error) {
            throw (error)
        }
    };

    insertMany = async (data: ICategory[]) => {
        try {

            let seqObj: SequenceObj = await GetIncSequenceID('products', data.length)

            data = data.map((product, i) => {
                product.id = seqObj.seq - (data.length - i)
                return product
            })

            let inserted = await collections.categories?.insertMany(data)

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

            return updatedIds
        } catch (error) {
            throw (error)
        }
    };

    updateOne = async (query: Query, data: Category) => {
        try {
            let filters = query.generateFilterElements()

            let update = await collections.categories?.findOneAndUpdate(filters, { "$set": { data } })
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
            let update = (await collections.categories?.findOneAndDelete(filters))
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
        return await (collections.categories?.find<ICategory>(
            { $text: { $search: text } },
            { projection: { score: { $meta: "textScore" } } })
            .sort({ score: { $meta: "textScore" } })
            .toArray()) as Category[];
    };

}
