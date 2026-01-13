import { Request, Response } from "express";

export const registerController = (req: Request, res: Response) => {
  console.log("This is the register route");

  res.status(200).json({ msg: "This is the register route" });
};

export const loginController = (req: Request, res: Response) => {
  console.log("This is the login route");

  res.status(200).json({ msg: "This is the login route" });
};

export const logoutController = (req: Request, res: Response) => {
  console.log("This is the logout route");

  res.status(200).json({ msg: "This is the logout route" });
};
