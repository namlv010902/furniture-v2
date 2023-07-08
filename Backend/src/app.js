import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./routers/categories"
import productRouter from "./routers/products"
import authRouter from "./routers/auth"
import cartRouter from "./routers/carts"
import orderRouter from "./routers/orders"
import commentRouter from "./routers/comments"
import favoriteRouter from "./routers/favorites"
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
app.use("/api",commentRouter)
app.use("/api",favoriteRouter)
mongoose.connect("mongodb://127.0.0.1:27017/furniture")
.then(()=>console.log("kết nối thành công furniture"))
export const viteNodeApp = app