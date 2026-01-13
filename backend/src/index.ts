import express from "express";
import cors from "cors";
import "dotenv/config";
import { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser = require("cookie-parser");
import { notFoundMiddleware } from "./middleswares/notFoundMiddleware";
import { errorHandlerMiddleware } from "./middleswares/errorHandlerMiddleware";
import authRouter from "./routes/auth-route";

const authRoute = authRouter;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
};

// nuber 1:
app.use(cors(corsOptions));

// number 2:
app.use(cookieParser());

// number 3:
app.use(express.json());


// routes:

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>This is the index.ts route...</h1>");
});

app.use("/api/v1/auth",authRoute);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000


// 👇======This is the startup without a database connected==============👇
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/CV-ANALYZER");
    console.log("connected to DB")
    app.listen(PORT,"localhost",()=>{
        console.log(`server listening on port ${PORT}`)
    })
  } catch (error) {
    const message = 
      error instanceof Error ? error.message : "something went wrong";
      console.log("startupError:",message)
  };
};

start();
