import { Router } from "express";
import { analyzeController } from "../controllers/analyzeController";
import { uploadCv } from "../middleswares/uploadCvMiddleware";

const analyzeRouter = Router();

// analyzeRouter.post("/analyze-route",uploadCv.single("cvFile"),analyzeController);
analyzeRouter.post("/analyze-route",uploadCv.single("cvFile"),analyzeController);

export default analyzeRouter;