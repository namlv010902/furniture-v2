import { useEffect, useState } from "react"
import { IProduct } from "../../types/products"
import { getProductNew } from "../../api/products"
import { Link } from "react-router-dom"


const NewProducts = () => {
    const [products, setProducts] = useState<IProduct[]>()
    useEffect(() => {
      getProductNew().then(({ data }) => setProducts(data.product.docs)
      )
    }, [])
  return (
    <div>
         <div className="title" >
   <div className="title-child"><h1>Sản phẩm mới</h1><h5></h5></div> 
     <hr />
    <em style={{color:"black"}}>Cập nhật các sản phẩm bán chạy nhất trong tuần</em>
    </div>
    <div className="products-hottrend">
    {products?.map((item:any)=>(
          <div className="colum" key={item._id}>
          <div className="image">
           
           <img src={item.image} alt="" />
           <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>
           <div className="icon">
         <Link to={`/product/`+item._id}> <i className="fa fa-eye" aria-hidden="true"></i></Link> 
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
           </div>
          </div>
          <div className="content">
            <h3>F1GENZ độc quyền</h3>
            <p>{item.name}</p>
            <strong>{item.price}</strong>
        
          </div>
        </div>
        ))}
      
     
     
     
     
    </div>
    </div>
  )
}

export default NewProducts