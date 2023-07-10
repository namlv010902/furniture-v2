import express  from "express";
import { upload } from "../controllers/upload";
import multer from "multer"
import cloudinary from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
const router = express.Router()
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "angular",
      format: "jpg",
    },
  });
  const uploadImg = multer({
    storage: storage,
  });
router.post("/upload",uploadImg.array("image", 1),upload)
export default router