export interface Exception extends Error {
    status: number;
}

export class ValidateError extends Error implements Exception {
    name: string
    message: string = "";
    status: number = 400;
    details: ValidationErrorDetails

    constructor(message: string, status: number) {
        super()
        this.message = message, this.status = status
    }
}

interface ValidationErrorDetails {
    [name: string]: { message: unknown }
}
