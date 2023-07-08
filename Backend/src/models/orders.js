import { string } from "joi";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cartId:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:"Cart"
},
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    customerName:{
      type:String,
      required:true  
  },
    
    products:[{
        productId:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:"Products"
        },
        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        }
    }     

    ],
    OrderDate:{
        type: Date,
        required:true,
        default:Date.now()    //ngay tại thời điểm tạo bill
      },
      DeliveryDate:{
        type:Date,
        required:true,
        default: function() {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + 3);
           // Thêm 3 ngày vào ngày hiện tại
          return currentDate;
        }
      },
      pay:{
        type:Boolean,
        default:false
      },
  note:{
    type:String,
    
  },
  address:{
    type:String,
    required: true,
  },
  phone:{
    type:String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  status:{
    type:String,
    default:"Chờ xác nhận"
  }
    

},{timestamps:true, versionKey:false});

export default mongoose.model("Order", orderSchema)