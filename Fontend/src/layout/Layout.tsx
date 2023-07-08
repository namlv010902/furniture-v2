
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import { ICart } from '../types/cart'
interface IProps{
  cart:ICart[]
  removeOneProductInCart(id:any):void
  user:any
  logOut():void
}
const Layout = (props:IProps) => {
  return (
    <div className='container'>
    <Header cart={props.cart} user={props.user}
     removeOneProductInCart={props.removeOneProductInCart} 
     logOut={props.logOut}
     ></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  

  )
}

export default Layout