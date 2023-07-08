import express  from "express";
import { getAllUser, getUser, login, register, updateProfile } from "../controllers/auth";

const router = express.Router()

router.post("/auth/register",register)
router.get("/user",getAllUser)
router.post("/auth/login",login)
router.patch("/auth/profile",updateProfile)
router.get("/auth/user/:id",getUser)


export default router