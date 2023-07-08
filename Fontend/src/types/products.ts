import { ICate } from "./categories";

export interface IProduct{
    _id:string;
    name:string;
    price:number;
    image:string;
    desc:string;
    material:string;
    categoryId:ICate;
   cate:ICate
    

   
    
}