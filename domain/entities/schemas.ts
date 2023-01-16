const productJSONSchema = {
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

const categoryJSONSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "description"],
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
        }
    }
}

export { productJSONSchema, categoryJSONSchema }