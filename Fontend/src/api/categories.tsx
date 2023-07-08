
import { instance } from "./config"

export const getCategories=()=>{
    return instance.get('category')
}

export const getCategory=(id:string)=>{
    return instance.get('category/'+id)
}


