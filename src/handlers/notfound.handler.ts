import { Response } from "express";

export const notFoundHandler = (_req: any, res: Response) => {
  res.status(404).send({
    message: "Not Found",
  });
}