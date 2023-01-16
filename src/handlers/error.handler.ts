
import {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import { ValidateError } from "tsoa";

export const errorHandler = (
    err: unknown,
    _: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void => {
    // TSOA Classes Validator Handler
    if (err instanceof ValidateError) {
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }

    // Default Error Handler
    if (err instanceof Error) {
        return res.status(500).json({ error: err });
    }

    next();
}