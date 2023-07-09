import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
export const sendForgotPasswordEmail = async (req, res) => {
  try {
    const {email} = req.body
    // Tạo một transporter để kết nối với tài khoản email admin
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'namphpmailer@gmail.com', 
        pass: 'rhlacgylyyzpiczf' 
      }
    });

    // Định nghĩa nội dung email
    const token = jwt.sign({ email }, 'namdeptrai', { expiresIn: '1h' });

    // Định nghĩa nội dung email
    const mailOptions = {
      from: 'namphpmailer@gmail.com', 
      to: email, // Địa chỉ email của người dùng
      subject: 'Yêu cầu đặt lại mật khẩu',
      text: `Vui lòng nhấp vào đường dẫn sau để đặt lại mật khẩu của bạn: http://localhost:5173/auth/resetPassword/${token}` // thêm mã token vào đường dẫn
    };
    // Gửi email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email gửi thành công:', result);
    return res.status(201).json({
        message: 'Send mail successfully',
      });
  } catch (error) {
    return res.status(400).json({
        error: error.message
      });
  }
};
