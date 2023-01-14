import { ObjectId, MongoServerError } from "mongodb";

import { Category, ICategory } from '../../../../domain/entities/category.model'
import { IQuery } from '../../../../domain/entities/query.model'

import { collections } from '../../../database/mongo.service';

export interface ICategoriesRepo {
    find: (query: IQuery) => Promise<Category[]>;
    findOne: (query: IQuery) => Promise<Category>;
    insertOne: (data: ICategory) => Promise<number>;
    insertMany: (data: Category[]) => Promise<number[]>;
    updateOne: (query: IQuery, data: Category) => Promise<Category>;
    deleteOne: (query: IQuery) => Promise<number>;
    search: (data: string) => Promise<Category[]>;
}

export const buildCategoriesRepo = (): ICategoriesRepo => {
    const find = async (query: IQuery) => {
        try {
            let filters = query.generateFilterElements()
            return await collections.categories?.find<ICategory>(filters).toArray() as Category[];
        } catch (err) {
            if (err instanceof MongoServerError) {
                console.error("No Documents Found:(" + err.code + ")\n", err)
                // insertResult = { 
                //     insertedId: null,
                //     message: "Message expalining the situation."
                // }
                throw (err)
            }

            throw (err)
        }
    };

    const findOne = async (query: IQuery) => {
        try {
            let filters = query.generateFilterElements()
            return await collections.categories?.findOne<ICategory>(filters) as Category;
        } catch (error) {
            throw (error)
        }
    };

    const insertOne = async (data: ICategory) => {
        try {
            let filters = { "name": data.name }
            let foundCategory = collections.categories?.findOne(filters)
            if (foundCategory) throw new Error("Category already exists")

            let update = await collections.categories?.insertOne(data)

            let updateID = update?.insertedId as ObjectId

            return 0
        } catch (error) {
            throw (error)
        }
    };

    const insertMany = async (data: ICategory[]) => {
        try {
            let update = await collections.categories?.insertMany(data)

            let updatedIDs = update?.insertedCount as number;
            if (updatedIDs) {
                return []
            }

            throw new Error("insert error");
        } catch (error) {
            throw (error)
        }
    };

    const updateOne = async (query: IQuery, data: ICategory) => {
        try {
            let filters = query.generateFilterElements()
            let update = (await collections.categories?.findOneAndUpdate(filters, data))
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

    const search = async (text: string) => {
        return await (collections.categories?.find<ICategory>(
            { $text: { $search: text } },
            { projection: { score: { $meta: "textScore" } } })
            .sort({ score: { $meta: "textScore" } })
            .toArray()) as Category[];
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

