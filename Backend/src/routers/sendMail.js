import express  from "express";
import { sendForgotPasswordEmail } from "../controllers/sendMail";


const router = express.Router()

router.post("/email",sendForgotPasswordEmail)
export default router