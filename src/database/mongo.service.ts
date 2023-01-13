import { Db, MongoClient, Collection } from "mongodb";

import { IProduct } from "domain/entities/product.model";
import { ICategory } from "domain/entities/category.model";

// import * as dotenv from "dotenv";

export const collections: {
    products?: Collection<IProduct>
    categories?: Collection<ICategory>
    // comonents?: Collection<IComponent>
    // contexts?: Collection<IContext>
} = {}

export async function connectToDatabase(uri: string): Promise<MongoClient> {
    const client: MongoClient = new MongoClient(uri);//process.env.DB_CONN_STRING);
    // dotenv.config();
    try {
        await client.connect();

        const db: Db = client.db("mongo")//process.env.DB_NAME);

        console.log(`Successfully connected to database: ${db.databaseName}`);

        const productsCollection: Collection<IProduct> = db.collection<IProduct>("products");//(process.env.PRODUCTS_COLLECTION_NAME);
        collections.products = productsCollection;

        console.log(`Successfully connected collection: ${productsCollection.collectionName}`)

        const categoriesCollection: Collection<ICategory> = db.collection<ICategory>("categories");//(process.env.CATEGORIES_COLLECTION_NAME);
        collections.categories = categoriesCollection;

        console.log(`Successfully connected collection: ${categoriesCollection.collectionName}`)

    } catch (e) {
        client.close();
        console.log(`Successfully connected`)
        throw e
    }

    return client
}

