import express  from "express";
import { categoryProducts, createProduct, filterPrice, getAllProduct, getOneProduct, productOutstanding, removeProduct, updateProduct } from "../controllers/products";
import { checkPermissionAndAuth } from "../middlewares/checkPermission";
;

const router = express.Router()

router.post("/product",checkPermissionAndAuth,createProduct)
router.patch("/product/:id",checkPermissionAndAuth,updateProduct)
router.get("/product/",getAllProduct)
router.get("/product/:id",getOneProduct)
router.delete("/product/:id",checkPermissionAndAuth,removeProduct)
router.post("/productFilter/",filterPrice)
router.get("/productOutstanding/:idCate",productOutstanding)
router.get("/categoryProducts/:idCate",categoryProducts)


export default router