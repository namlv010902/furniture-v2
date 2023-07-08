import './header.css'
import { Button, Tooltip } from 'antd';
import { Popover } from 'antd';
import { Link, useNavigate } from "react-router-dom"
import { getAll, searchProduct } from '../../api/products';
import { useEffect, useState } from 'react';
import { IProduct } from '../../types/products';
import { ICart } from '../../types/cart';
interface IProps {
  cart: ICart[]
  removeOneProductInCart(id: any): void
  user:any
  logOut():void
}
const Header = (props: IProps) => {
  const navigate = useNavigate()
  let countProductInCart = props.cart?.products?.length || 0
  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    getAll().then(({ data }) => setProducts(data.product.docs)
    )
  }, [])
  
  const handleSearch = (value: any) => {
    console.log(value);

    searchProduct(value).then(({ data }) => {
      setProducts(data.product.docs)
    })
  }
  const onRemoveProductInCart = (id: string) => {
    console.log();

    props.removeOneProductInCart(id)
  }
  const myAccount = (
    <div>
      <Button onClick={() => props.logOut()}>Đăng xuất</Button>

    </div>
  );
  const content = (
    <div>
      <Link to="/auth/register">ĐĂNG KÝ</Link> <br />
      <Link to="/auth/login">ĐĂNG NHẬP</Link>

    </div>
  );
  const showSearch = (

    <div className='show-search'>
      {products?.map(item => {
        return (
          <div key={item._id} >
            <Link className="item-cart" to={`/product/${item._id}`}>
              <div className="image-cart">
                <img src="https://bizweb.dktcdn.net/thumb/compact/100/210/557/products/37.jpg" alt="" />
              </div>
              <div className="product-in-search">
                <p>{item.name}</p>
                <strong>{item.price}đ </strong>

              </div>

            </Link>
          </div>
        )
      })}
      {products?.length == 0 && <p>Ko tìm thấy</p>}



    </div>
  )
  const showCart = (


    <div className='show-cart'>
      {props?.cart?.products ? <div>
        {props.cart?.products?.map((item: any) => (
          <div key={item._id}>
            <div className="item-cart">
              <div className="image-cart">
                <img src={item.productId.image} alt="" />
              </div>
              <div className="product-in-cart">
                <p>{item.productId.name}</p>
                <strong id='price'>${item.productId.price} </strong>
                <p>( x{item.quantity} )</p>
              </div>
              <i onClick={() => onRemoveProductInCart(item.productId._id)} className="fa-regular fa-circle-xmark"></i>
            </div>


          </div>

        ))}
        <strong id='priceTotal'>Tổng tiền tạm tính: ${props.cart?.totalPrice}</strong> <br />
        <Link to="/cart"> <button className="btn-show-cart" >Giỏ hàng</button></Link>
      </div> : <p> <i className="fa-regular fa-circle-exclamation"></i> Giỏ hàng trống</p>
      }



    </div>

  )


  return (
    <div className='header'>
      
      <header>
        <div className='logo'>
          <Link to="/"> <img height="50px" src="https://bizweb.dktcdn.net/thumb/large/100/482/001/themes/906081/assets/shop_logo_image.png?1687164764867" alt="" /></Link>
        </div>
        <nav>
        <ul>
          <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
          <li><Link to="/products">Product</Link></li>
          <li><Link to="/blog">Blog</Link></li>
         
        </ul>
      </nav>
        <form action="#" id="formSearch" >


          <Tooltip title={showSearch}> <input onChange={e => handleSearch(e.target.value)} id="inputSearch" type="text" name="" placeholder="Search..." /></Tooltip>
          <button  className='btn-search'><i className="fa fa-search" aria-hidden="true"></i></button>


        </form>
        
        <div className="action">
          <Link to="/order"> <i title="Đơn hàng của bạn" className="fa fa-money-bill"></i> </Link>

          <Popover content={showCart} placement="bottom" >
            <Link to="/cart" id='dropCart'>  <i title='Giỏ hàng của bạn' className='fa fa-shopping-basket'></i> <p>{countProductInCart}</p> </Link></Popover>

          <Link to="favorite"><i title='Sản phẩm yêu thích của bạn' className="fa fa-heart-o" aria-hidden="true"></i> </Link>

          {!props.user ? <Popover content={content} placement="bottom" >
            <Button>Tài khoản</Button> </Popover>
            : <Popover placement='bottom' content={myAccount}><Link to="/profile"><img title="Tài khoản của bạn" id='avatar' src={props.user.avatar} alt="" /></Link></Popover>

          }

        </div>
      </header>
     














    </div>
  )
}

export default Header