import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = error;
  console.log("error message from errorHandlerMiddleware:", message);
  res
    .status(500)
    .json({ msg: error instanceof Error ? message : "something went wrong" });
  return;
};
