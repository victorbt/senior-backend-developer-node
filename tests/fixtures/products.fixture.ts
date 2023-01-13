import { faker } from '@faker-js/faker'
import { ObjectId } from "mongodb";
import { Product, IProduct } from '../../domain/entities/product.model'


export const fakeProducts = (): IProduct[] => {
    var product: Product = {
        _id: ObjectId.createFromHexString(faker.database.mongodbObjectId()),
        id: 1,
        name: faker.commerce.product(),
        price: faker.datatype.number(),
        categories: [faker.datatype.string()]
    }

    var product2: Product = {
        _id: ObjectId.createFromHexString(faker.database.mongodbObjectId()),
        id: 2,
        name: faker.commerce.product(),
        price: faker.datatype.number(),
        categories: [faker.datatype.string()]
    }

    var products: IProduct[] = [product, product2]

    return products
}