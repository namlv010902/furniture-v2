import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    },
    outstanding:{
        type:Boolean,
        default:false
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"

    },
    // bandId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:"Brand"

    // }
},{timestamps:true, versionKey:false});
  productSchema.plugin(mongoosePaginate)
  productSchema.index({ name: 'text' })
export default mongoose.model("Products", productSchema)