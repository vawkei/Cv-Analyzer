import {
  registerController,
  loginController,
  logoutController
} from "../controllers/authController";

import { Router } from "express";

const authRouter = Router();

authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.get("/logout",logoutController);

export default authRouter;
