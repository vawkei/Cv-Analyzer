import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req: Request, res: Response) => {
  console.log("This is the register route");

  const { name, email, password } = req.body;
  console.log(`name:${name},email:${email},password:${password}`);

  if (!name || !email || !password) {
    console.log("input fields shouldn't be empty");
    return res.status(400).json({ msg: "input fields shouldn't be empty" });
  }

  try {
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      console.log("kindly log in");
      return res.status(401).json({ msg: "kidly log in" });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("emailExistsError:", message);
    return res.status(500).json({ msg: message });
  }

  if (password.trim().length < 6) {
    console.log("password shouldn't be less than 6 letters");
    return res
      .status(400)
      .json({ msg: "password shouldn't be less than 6 letters" });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword =await bcrypt.hash(password, salt);

  //   const userData = { name: name, email: email, password: hashedPassword };
  const userData = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  try {
    // const registered = await User.create(userData)
    const registered = await User.create(userData);
    if (registered) {
      registered.isRegistered = true;
      await registered.save();
      console.log("new user registered");
      return res.status(200).json({ msg: "new user registered" });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("registrationError:", message);
    res.status(500).json({ msg: "registrationError:", message });
  }

  // res.status(200).json({ msg: "This is the register route" });
};

export const loginController = async (req: Request, res: Response) => {
  console.log("This is the login route");

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("input fields shouldn't be empty");
    return res.status(400).json({ msg: "input fields shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user || !user.isRegistered) {
      console.log("Login failed:user not found or not registered");
      return res.status(401).json({ msg: "invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("invalid credentials");
      return res.status(400).json({ msg: "invalid credentials" });
    }

    console.log("about to issue jwt cookie");

    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET_V!,
      { expiresIn: "1d" }
    );

    if (user && isPasswordValid) {
      const oneDay = 1000 * 60 * 60 * 24;

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure:true,
        // sameSite:"none"
      });

      console.log("loggedIn successfully");
      res.status(200).json({ msg: "loggedin successfully", user: user });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("responseFromDB", message);
    return res.status(500).json({ msg: message });
  }

  // res.status(200).json({ msg: "This is the login route" });
};

export const logoutController = (req: Request, res: Response) => {
  console.log("This is the logout route");

  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      // secure:true,
      // sameSite:"none"
    });

    console.log("user loggedout successfully");
    res.status(200).json({ msg: "user loggedout successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("logoutError:", message);
  }

  // res.status(200).json({ msg: "This is the logout route" });
};
