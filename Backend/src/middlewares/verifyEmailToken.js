import jwt from "jsonwebtoken"
import User from "../models/users"

export const authenticateEmailToken = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]
      console.log(token);
      jwt.verify(token, "namdeptrai", async (err, payLoad) => {
        if (err) {
          if (err.name == "JsonWebTokenError") {
            return res.status(401).json({
              message: "Token không hợp lệ!",
              //Token không hợp lệ
            });
          }
          if (err.name == "TokenExpiredError") {
            return res.status(402).json({
              message: "Token hết hạn",
            });
          }
        }
        console.log(payLoad);
  
        const user = await User.findOne({ email: payLoad.email });
        if (!user) {
          return res.status(402).json({
            message: "User not found"
          });
        }
  
        console.log(user);
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  };
  