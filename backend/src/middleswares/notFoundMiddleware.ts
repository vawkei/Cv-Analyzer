import { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  const message = "Route doesn't exist...";

  console.log("notFoundMiddleware:", message);
  res.status(404).send({msg:message})
  return;
};
