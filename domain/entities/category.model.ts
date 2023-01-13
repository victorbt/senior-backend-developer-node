import { Db, ObjectId } from "mongodb";

export interface ICategory {
    _id?: ObjectId;
    id: number;
    name: string;
    categories: string[];
}

export class Category implements ICategory {
    constructor(public id: number, public name: string, public categories: string[], public _id?: ObjectId) { }
}

export const buildCategoryJsonSchemaModel = async (db: Db, name: string) => {
    await db.command({
        "collMod": "categories",
        "validator": {}
    });
};

