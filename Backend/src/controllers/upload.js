import cloudinary from "cloudinary"
 const CLOUDINARY_API_KEY="335541795944436"
const CLOUDINARY_API_SECRET="Qb9YTdMpThQ8zligwdAU8rFuEVQ"
const CLOUDINARY_CLOUD_NAME="dgqvtbr4n"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  export const upload = async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      
      return res.status(200).json({
        message: 'Upload successful',
        imageUrl: result.secure_url
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Upload failed',
        error: error.message
      });
    }
  };