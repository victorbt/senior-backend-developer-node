import { Db, ObjectId } from "mongodb";

export interface IProduct {
    _id?: ObjectId;
    id: number;
    name: string;
    price: number;
    categories: string[];
}

export class Product implements IProduct {
    constructor(public id: number, public name: string, public price: number, public categories: string[], public _id?: ObjectId) { }
}

export const buildProductJsonSchemaModel = async (db: Db) => {
    await db.command({
        "collMod": "products",
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "category"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string"
                    },
                    price: {
                        bsonType: "number",
                        description: "'price' is required and is a number"
                    },
                    category: {
                        bsonType: "string",
                        description: "'category' is required and is a string"
                    }
                }
            }
        }
    });
};

