import { Db, ObjectId } from "mongodb";

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

export const buildProductDatabaseJsonSchemaModel = async (db: Db,collection:string) => {
    await db.command({
        "collMod": collection,
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "description", "vendor", "image", "price", "categories"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string",
                        minLength: 2,
                    },
                    description: {
                        bsonType: "string",
                        description: "'description' is required and is a string",
                        minLength: 5,
                    },
                    vendor: {
                        bsonType: "string",
                        description: "'vendor' is required and is a string",
                        minLength: 2
                    },
                    image: {
                        bsonType: "string",
                        description: "'name' is required and is a (url)string ",
                        minLength: 5
                    },
                    price: {
                        bsonType: "number",
                        minimum: 0,
                        description: "'price' is required and is a number"
                    },
                    categories: {
                        bsonType: "array",
                        uniqueItems: true,
                        items: {
                            type: "string"
                        },
                        minItems: 1,
                        description: "at least one value for 'categories' is required and is a array of string"
                    }
                }
            }
        }
    });
};

