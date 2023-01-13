export interface IQuery {
    filters: IFilter[]
    pagination: IPagination
    sort: any
    generateFilterElements: () => Object;
}

export interface IFilter {
    field: string;
    operator: string;
    value: Array<string> | Array<number> | number | string;
}

export interface IPagination {
    offset: number
    limit: number
}

export class Query implements IQuery {
    filters: IFilter[]
    pagination: IPagination
    sort: any

    constructor(filters: IFilter[], pagination: IPagination, sort: any) {
        this.filters = filters;
        this.pagination = pagination;
        this.sort = sort
    }

    generateFilterElements(): Object {
        let mongoFilters: Record<string, any> = {}

        for (var filter of this.filters) {
            switch (typeof filter.value) {
                case 'string' || 'number':
                    mongoFilters[filter.field] = filter.value
                    break;
                case 'object':
                    const isArray = (x: any): x is ArrType => true
                    if (isArray(filter.value)) {
                        let mongoFilter: Record<string, any> = {}
                        mongoFilter[filter.operator] = filter.value
                        mongoFilters[filter.field] = mongoFilter
                    }
                    break;
                default:
                    console.log("Unexpect filter type")
                    break;
            }
        }

        return mongoFilters
    }
}

type ArrType = Array<any>