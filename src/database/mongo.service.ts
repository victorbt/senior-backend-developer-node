import { Db, MongoClient, Collection } from "mongodb";

import {
    DatabaseConfig
} from '../application/config/database.config';

import { mongoIndexes } from '../../domain/constants/database'

import { IProduct, buildProductDatabaseJsonSchemaModel } from "../../domain/entities/product.model";
import { ICategory } from "../../domain/entities/category.model";

export const collections: {
    products?: Collection<IProduct>
    categories?: Collection<ICategory>
    counters?: Collection<SequenceObj>
    // components?: Collection<IComponent> // in the future implements ui components as backend entities asociated to a custom resolver and defined renderer
    // contexts?: Collection<IContext> //  in the future implements application pages as contexts(sets of components) to provide configurable pages and contextual aisles
} = {}

export async function connectToDatabase(dbConfig: DatabaseConfig): Promise<MongoClient> {
    const client: MongoClient = new MongoClient(dbConfig.MONGO_URI);
    try {
        await client.connect();

        const db: Db = client.db("mongo");

        console.log(`🟢 Mongo db connected: ${db.databaseName}`);

        const productsCollection: Collection<IProduct> = db.collection<IProduct>("products");//(process.env.PRODUCTS_COLLECTION_NAME);
        collections.products = productsCollection;
        // Create
        buildProductDatabaseJsonSchemaModel(db, "products")

        createDatabaseIndexes(db, "products", mongoIndexes["products"])

        console.log(`Successfully connected collection: ${productsCollection.collectionName}`)

        const categoriesCollection: Collection<ICategory> = db.collection<ICategory>("categories");//(process.env.CATEGORIES_COLLECTION_NAME);
        collections.categories = categoriesCollection;

        console.log(`Successfully connected collection: ${categoriesCollection.collectionName}`)

        const countersCollection: Collection<SequenceObj> = db.collection<SequenceObj>("counters");//(process.env.CATEGORIES_COLLECTION_NAME);
        collections.counters = countersCollection;

        console.log(`Successfully connected collection: ${countersCollection.collectionName}`)

    } catch (e) {
        client.close();
        console.log(e)
        throw e
    }

    return client
}


async function createDatabaseIndexes(db: Db, collectionName: string, indexes: any) {
    for (let index of indexes) {
        await db.createIndex(collectionName, index)
    }
}


export interface SequenceObj {
    seq: number
}

export async function GetIncSequenceID(collectionKey: string, increment: number) {
    let filter = { "id": collectionKey }
    let update = { "$inc": { "seq": increment } }
    let upsert = true

    let result = await collections.counters?.findOneAndUpdate(filter, update, { upsert })

    return result && result.value ? result.value as SequenceObj : { seq: 0 }
}