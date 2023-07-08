import Carousel from '../../../components/banner/banner'
import NewProducts from '../../../components/newProduct/NewProducts'
import TopProduct from '../../../components/topProduct/TopProduct'
import './home.css'
interface IProps{
  handleAddToCart(data:any):void
}
const Home = (props:IProps) => {


  return (
    <div className='home'>
      
      <Carousel ></Carousel>
      <div className="home-main">

     
      <div className="actions">
      <div className="box">
        <i className="fa fa-globe" aria-hidden="true"></i>
        <div className="box-text">
        <h3>GIAO HÀNG 24H</h3>
<p style={{color:"#91959b"}}>Với đơn hàng trên 500.000 đ</p>      
 </div>
      </div>
      <div className="box">
        <i className="fa fa-check" aria-hidden="true"></i>
        <div className="box-text">
        <h3>CHẤT LƯỢNG
</h3>
<p style={{color:"#91959b"}}>Bảo đảm chất lượng</p>      
 </div>
      </div>
      <div className="box">
        <i className="fa fa-bell" aria-hidden="true"></i>
        <div className="box-text">
        <h3>NGUỒN GỐC</h3>
<p style={{color:"#91959b"}}>Nhập khẩu chính hãng</p>      
 </div>
      </div>
     
      

    </div>
      <div className="product">
      <img src="https://img.freepik.com/free-photo/chic-modern-luxury-aesthetics-style-living-room-in-gray-tone_53876-132806.jpg?w=1060&t=st=1688716367~exp=1688716967~hmac=dbb1c47a0be5fa0a922c1080713033a8ea75364cebacc5dd789eb8c60e9c0785" alt="" />

      <img src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129803.jpg?w=1060&t=st=1688716288~exp=1688716888~hmac=7ae7477e34da5ac21e496f120b0576f616b2f94bc728bc7977e1836f9478cf47" alt="" />
      <img src="https://img.freepik.com/premium-photo/luxurious-modern-classic-black-interior-generative-ai_372999-11253.jpg?w=1060" alt="" />
      <img src="https://img.freepik.com/premium-photo/a-living-room-with-a-grey-couch-and-a-white-coffee-table-with-a-white-lamp-on-it-generative-ai_627050-316.jpg?w=1060" alt="" /> 
      </div>
      <TopProduct handleAddToCart={props.handleAddToCart}></TopProduct>
      
 
    
<div className="banner-child">
<img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/banner_2_image.png?1685520819893" alt="" />

</div>
   <NewProducts></NewProducts>
    <div className="title" >
   <div className="title-child"><h1>Tin tức</h1><h5></h5></div> 
     <hr />
    <em style={{color:"black"}}>Tin tức hót nhất</em>
    
    </div>
    <div className="news">
      <div className="new-item">
        <div className="new-item-image">
          <img src="https://bizweb.dktcdn.net/thumb/grande/100/210/557/articles/blog-detail-3b2beed9-bf42-466e-a845-47c3dcbd04e7-f64c0fdd-155d-4265-b9db-a10fcce7c2ac.jpg?v=1494385364443" alt="" />
        </div>
        <div className="new-item-content">
           <h2><a href="">Top những cách phối màu cho căn phòng đẹp </a> </h2>
           <p>Đối với gia đình Việt, phòng bếp luôn là nơi quan trọng vì ở đó, gia đình quây quần sum họp bên nhau sau một ngày dài làm việc.</p>
           <a href="" id='view-add'>Xem thêm</a>
        </div>
      </div>
      <div className="new-item">
        <div className="new-item-image">
          <img src="https://bizweb.dktcdn.net/thumb/grande/100/210/557/articles/blog-03.jpg?v=1494385154030" alt="" data-ll-status="loaded" />
        </div>
        <div className="new-item-content">
           <h2><a href="">Top những cách phối màu cho căn phòng đẹp </a> </h2>
           <p>Đối với gia đình Việt, phòng bếp luôn là nơi quan trọng vì ở đó, gia đình quây quần sum họp bên nhau sau một ngày dài làm việc.</p>
           <a href="" id='view-add'>Xem thêm</a>
        </div>
      </div>
      <div className="new-item">
        <div className="new-item-image">
          <img src="https://bizweb.dktcdn.net/thumb/grande/100/210/557/articles/blog-02.jpg?v=1494385143167" alt="" />
        </div>
        <div className="new-item-content">
           <h2><a href="">Top những cách phối màu cho căn phòng đẹp </a> </h2>
           <p>Đối với gia đình Việt, phòng bếp luôn là nơi quan trọng vì ở đó, gia đình quây quần sum họp bên nhau sau một ngày dài làm việc.</p>
           <a href="" id='view-add'>Xem thêm</a>
        </div>
      </div>
    </div>
    </div>
    </div>
    
  )
}

export default Home