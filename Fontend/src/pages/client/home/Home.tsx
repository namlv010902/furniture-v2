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
      <img src="https://img.freepik.com/free-photo/luxury-domestic-kitchen-with-elegant-wooden-design-generated-by-ai_188544-15357.jpg?w=1380&t=st=1688840141~exp=1688840741~hmac=bc44d539ee6bfb4c6748d0fc47c8d14f89330760fa4903db180c1ae7f3b18ed6" alt="" />
      <img src="https://img.freepik.com/premium-photo/a-living-room-with-a-grey-couch-and-a-white-coffee-table-with-a-white-lamp-on-it-generative-ai_627050-316.jpg?w=1060" alt="" /> 

      <img src="https://as1.ftcdn.net/v2/jpg/05/97/78/58/1000_F_597785854_0MTv7Un7TvjYYVFUFZkk6NCfEgGix38a.jpg" alt="" />
      <img src="https://img.freepik.com/free-photo/armchair-in-living-room-with-copy-space_43614-908.jpg?w=996&t=st=1688839899~exp=1688840499~hmac=bb577646ed8c3f494e3a7ea571a91114d77d315457e51d27f49fd37fb850a25d" alt="" />

      </div>
      <TopProduct handleAddToCart={props.handleAddToCart}></TopProduct>
      
 
    
<div className="banner-child">
<img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/banner_2_image.png?1685520819893" alt="" />

</div>
   <NewProducts handleAddToCart={props.handleAddToCart}></NewProducts>
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