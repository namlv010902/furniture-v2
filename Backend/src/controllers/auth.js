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
export const updateProfile=async(req, res)=>{
    try {
        
        const {email,userId} = req.body
        const allUser = await User.find()
        const user = await User.findOne({_id:userId})
       const check = await allUser.find((item)=>{
        return item.email == email && user.email != email
       })
     
        if(check){
            return res.status(401).json({
                message: "Email đã được đăng ký"
            })
        }
        const emailExists =await User.findByIdAndUpdate(userId,req.body,{new:true})    
        return res.status(201).json({
            message: "Update account successfully",
            emailExists
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
export const getUser=async(req, res)=>{
    try {
        const userId = req.params.id
        const user =await User.findById(userId)
        if(!user ){
            return res.status(401).json({
                message: "Account not found"
            })
        }
        
        return res.status(201).json({
            message: "Get account successfully",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}