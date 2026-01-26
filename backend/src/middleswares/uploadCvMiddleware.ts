// middlewares/fileUploadMiddleware.ts
import multer from "multer";

export const uploadCv = multer({
  storage: multer.memoryStorage(),
});
