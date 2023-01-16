import { faker } from '@faker-js/faker'
import { ObjectId } from "mongodb";
import { Product } from '../../domain/entities/product.model'


export const fakeProducts = (l: number): Product[] => {
    let products: Product[] = []

    let i = 0
    while (i < l) {
        var product: Product = {
            _id: ObjectId.createFromHexString(faker.database.mongodbObjectId()),
            id: i,
            name: faker.commerce.product(),
            image: faker.internet.url(),
            vendor: faker.company.name(),
            description: faker.commerce.productDescription(),
            price: faker.datatype.number(0),
            categories: [faker.datatype.string()]
        }

        products.push(product)
        i++;
    }

    return products
}