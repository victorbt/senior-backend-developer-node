const databaseName = "senior-backend-developer";
const productsCollection = "products";
const categoriesCollection = "categories";

const mongoIndexes: { [key: string]: any } = {
    productsCollection: [
        { id: 1 },
        {
            clusteredIndex: {
                key: { name: 1 },
                unique: true
            }
        },
        { name: "text" },
        {
            clusteredIndex: {
                key: { name: 1 },
                unique: true
            }
        },
        { categories: "text" },
        { description: "text" },
        {
            name: "text",
            categories: "text",
            description: "text"
        }
    ],
    categoriesCollection: [
        { "id": 1 },
        { name: "text" },
        {
            name: "text",
            description: "text"
        }
    ]
}

export { databaseName, productsCollection, categoriesCollection, mongoIndexes }