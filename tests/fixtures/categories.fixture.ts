import { faker } from '@faker-js/faker'
import { ObjectId } from "mongodb";
import { Category } from '../../domain/entities/category.model'

export const fakeCategories = (l: number): Category[] => {
    let categories: Category[] = []

    let i = 0
    while (i < l) {
        var category: Category = {
            _id: ObjectId.createFromHexString(faker.database.mongodbObjectId()),
            id: i,
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
        }

        categories.push(category)
        i++;
    }

    return categories
}