
import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import { ValidateError } from "tsoa";

import { ApiError } from '../../src/errors/api.error'

export const errorHandler = (
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void => {
    // TSOA Classes Validator Handler
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }

    // Custom API Error Handler
    if (err instanceof ApiError) {
        return res.status(400).json({ errror: err });
    }

    // Default Error Handler
    if (err instanceof Error) {
        return res.status(500).json({ errror: err });
    }

    next();
}