import { Db, ObjectId } from "mongodb";

import { categoryJSONSchema } from './schemas'

export interface ICategory {
    _id?: ObjectId;
    id?: number;
    name: string;
    description: string;
}

export class Category implements ICategory {
    constructor(
        public name: string,
        public description: string,
        public _id?: ObjectId,
        public id?: number
    ) { }
}

export const buildCategoriesDatabaseJsonSchemaModel = async (db: Db, collection: string) => {
    await db.command({
        "collMod": collection,
        "validator": categoryJSONSchema
    });
};
