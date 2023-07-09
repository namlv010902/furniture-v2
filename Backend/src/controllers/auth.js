import User from "../models/users"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken"
export const getAllUser=async(req, res)=>{
    try {
        const user = await User.find()
        return res.status(201).json({
            message: "Get all User successfully",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const register=async(req, res)=>{
    try {
        const {email,password} = req.body
        const emailExists =await User.findOne({email: email})
        if(emailExists ){
            return res.status(401).json({
                message: "Email đã được đăng ký"
            })
        }
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({...req.body,password:hashPassword})
        
        return res.status(201).json({
            message: "Register account successfully",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const login=async(req, res)=>{
    try {
        const {email,password} = req.body
        const user =await User.findOne({email: email})
        if(!user ){
            return res.status(401).json({
                message: "Tài khoản không tòn tại"
            })
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(402).json({
                message: "Sai mật khẩu"
            })
        }

       const accessToken = await jwt.sign({id:user._id},"namle2002",{expiresIn:"30ms"})
         user.password = undefined
        return res.status(201).json({
            message: "Login account successfully",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
