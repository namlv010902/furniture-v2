
import { instance } from "./config"
export const addToCart=(data:any)=>{
   
    return instance.post('cart/',data)
}
export const getCart=(userId:any)=>{
    // console.log(userId);
    return instance.get('cart/'+userId)
}
export const updateCart=(data:any)=>{
   console.log(data);
    return instance.patch('cart/',data)
}
export const removeProductInCart = (idProduct: string, idUser: string) => {
  const data={
    userId:idUser
   }
    
    return instance.post('cart/' + idProduct,data);
  }
  
  