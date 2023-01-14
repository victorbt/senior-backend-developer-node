import { Db, ObjectId } from "mongodb";

export interface ICategory {
    _id?: ObjectId;
    id?: number;
    name: string;
    description: string;
    categories: string[];
}

export class Category implements ICategory {
    constructor(
        public name: string,
        public description: string,
        public categories: string[],
        public _id?: ObjectId,
        public id?: number
    ) { }
}

export const buildCategoryJsonSchemaModel = async (db: Db) => {
    await db.command({
        "collMod": "categories",
        "validator": {}
    });
};

