import express  from "express";
import { createCategory, getAllCategory, getOneCategory } from "../controllers/categories";

const router = express.Router()

router.post("/category",createCategory)
router.get("/category",getAllCategory)
router.get("/category/:id",getOneCategory)

export default router