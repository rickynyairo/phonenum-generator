import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q && !req.query.sort) {
    throw new HTTP400Error("Missing a query parameter");
  } else {
    next();
  }
};