import { Db, MongoClient, Collection } from "mongodb";

import {
    DatabaseConfig
} from '../application/config/database.config';

import { IProduct, buildProductDatabaseJsonSchemaModel } from "../../domain/entities/product.model";
import { ICategory } from "../../domain/entities/category.model";

export const collections: {
    products?: Collection<IProduct>
    categories?: Collection<ICategory>
    // components?: Collection<IComponent>
    // contexts?: Collection<IContext>
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

        console.log(`Successfully connected collection: ${productsCollection.collectionName}`)

        const categoriesCollection: Collection<ICategory> = db.collection<ICategory>("categories");//(process.env.CATEGORIES_COLLECTION_NAME);
        collections.categories = categoriesCollection;

        console.log(`Successfully connected collection: ${categoriesCollection.collectionName}`)

    } catch (e) {
        client.close();
        console.log(e)
        throw e
    }

    return client
}

