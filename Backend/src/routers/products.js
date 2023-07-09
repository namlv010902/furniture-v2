import express  from "express";
import { categoryProducts, createProduct, filterPrice, getAllProduct, getOneProduct, productOutstanding, removeProduct, updateProduct } from "../controllers/products";
;

const router = express.Router()

router.post("/product",createProduct)
router.patch("/product/:id",updateProduct)
router.get("/product/",getAllProduct)
router.get("/product/:id",getOneProduct)
router.delete("/product/:id",removeProduct)
router.post("/productFilter/",filterPrice)
router.get("/productOutstanding/:idCate",productOutstanding)
router.get("/categoryProducts/:idCate",categoryProducts)


export default router