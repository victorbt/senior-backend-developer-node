import { Db, ObjectId } from "mongodb";

import { productJSONSchema } from './schemas'

export interface IProduct {
    _id?: ObjectId;
    id?: number;
    name: string;
    description: string;
    vendor: string;
    image: string;
    price: number;
    categories: string[];
}

export class Product implements IProduct {
    constructor(
        public name: string,
        public description: string,
        public vendor: string,
        public image: string,
        public price: number,
        public categories: string[],
        public id?: number,
        public _id?: ObjectId
    ) { }
}

export const buildProductDatabaseJsonSchemaModel = async (db: Db, collection: string) => {
    await db.command({
        "collMod": collection,
        "validator": productJSONSchema
    });
};

