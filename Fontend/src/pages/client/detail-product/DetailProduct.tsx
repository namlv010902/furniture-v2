import { Button, Form, Image, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProduct } from '../../../api/products';
import ShowComment from '../../../components/comment/Comment';
import { IProduct } from '../../../types/products';
import './DetailProduct.css';
import { checkFavorite, createFavorite, getFavorite, removeFavorite } from '../../../api/favorite';

interface IProps {
  handleAddToCart(data: any): void
  handleCreateComment(data: any): void
  comment: any,

}
const DetailProduct = (props: IProps) => {
  const [show, setShow] = React.useState(false)
  const [reset, setReset] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] =useState([])
  const [checkFavorites, setCheckFavorites] = useState(false)
  const [countFavorites, setCountFavorites] = useState(0)

  const { id } = useParams()
  const userId = JSON.parse(localStorage.getItem("userId")!);
  const data = {
    userId: userId,
    productId: product?._id
  }

  checkFavorite(data).then(() => {
    setCheckFavorites(true)
  })

  useEffect(() => {
    getProduct(id).then(({ data }) => {
      setProduct(data.product)
      setRelatedProducts(data.relatedProducts)
      console.log(data);
    }
    )
  }, [])
  useEffect(() => {
    getFavorite(product?._id).then(({ data }) => {
      console.log(data.favorite.length);
      setCountFavorites(data.favorite.length)
    })
  }, [checkFavorites])
  console.log(checkFavorites)


  const dataComment = {
    userId: userId,
    productId: product?._id
  }
  const restProduct = (id: string) => {
    getProduct(id).then(({ data }) => {
      setProduct(data.product)
      setRelatedProducts(data.relatedProducts)
    })
    scroll.scrollToTop();
    setReset(true)

  }

  const ShowDesc = () => {
    console.log("SHOW");
    return (
      <div>
        <p>{product?.desc}</p>
      </div>
    )

  }
  const onFinish = (values: any) => {

    if (!userId) {
      return toast.error("Bạn chưa đăng nhập")

    }
    const data = {
      userId: userId,
      quantity: values.quantity,
      productId: id
    }
    props.handleAddToCart(data);
    console.log('Success:', data);

  };
  const handleAddFavorite = (id: string) => {
    const data = {
      productId: id,
      userId: userId
    }
    !userId ? toast.error("Bạn chưa đăng nhập") : createFavorite(data).then(() => {
      toast.success("Đã thêm vào sản phẩm yếu thích")
      checkFavorite(data).then(() => {
        setCheckFavorites(true)
      })
    })

  }


  const handleRemoveFavorite = (id: string) => {

    const data = {
      productId: id,
      userId: userId
    }
    !userId ? toast.error("Bạn chưa đăng nhập") : removeFavorite(data).then(() => {
      toast.success("Đã xóa sản phẩm yếu thích")
      setCheckFavorites(false)                  ////////////////////
    })
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="banner-detail">

      </div>

      <div className="detail-main">

        <div className="menuchild">
          <a href="">Home </a>/
          <a href="">Ghế </a>/
          <a href="">Ghế sofa</a>
        </div>
        <div className="detailProduct">
          <div className="detailProduct-image">
            <Image id='main-img' src={product?.image} alt="" />
            {/* <img src="https://bizweb.dktcdn.net/100/480/479/products/18f46c314f06542af9798d254e4180.jpg?v=1678770547647" alt="" /> */}

            <div className="image-child">
              <img src="https://bizweb.dktcdn.net/100/480/479/products/33fa5002ba06a457fa097f5880d40e.jpg?v=1678770547647" alt="" />
              <img src="https://bizweb.dktcdn.net/100/480/479/products/33fa5002ba06a457fa097f5880d40e.jpg?v=1678770547647" alt="" />
              <img src="https://bizweb.dktcdn.net/100/480/479/products/33fa5002ba06a457fa097f5880d40e.jpg?v=1678770547647" alt="" />
            </div>
            <div className="heart-share">
              <p id="share">Chia sẻ:
                <img src="https://res.cloudinary.com/dgqvtbr4n/image/upload/v1688562185/fb-removebg-preview_s627uf.png" alt="" />
              </p>
              {checkFavorites ?
                <div className="heart">
                  Đã thích <i onClick={() => handleRemoveFavorite(product?._id)} style={{ color: "red" }} className="fa fa-heart" aria-hidden="true"></i>({countFavorites})
                </div>
                :
                <div className="heart">
                  Đã thích <i onClick={() => handleAddFavorite(product?._id)} className="fa fa-heart-o" aria-hidden="true"></i>({countFavorites})
                </div>
              }
            </div>
          </div>
          <div className="detailInfo">
            <h1 >{product?.name}</h1>
            <hr />
            <p id='detailStatus'>- Tình trạng: <span style={{ color: "#00c277" }}> Còn hàng</span> </p>
            <p>- Thương hiệu: <span>Furniture</span></p>
            <h3 id='priceDetail' >{product?.price}₫</h3>
            <p>- Mô tả sản phẩm: <br />
              <span>{product?.material}</span>
            </p>
            <p id='quantity'>- Số lượng: </p>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"  >
              <Form.Item
                name="quantity"
                rules={[{ required: true, message: 'Please input your username!' }]}
                initialValue={1}
              >
                <InputNumber min={1} id='quantity-input' />
              </Form.Item>

              <Form.Item  >
                <Button type="primary" htmlType="submit" id='addCart'>
                  <i className="fa fa-cart-plus" aria-hidden="true"></i>  Thêm giỏ hàng
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="blog">
            <div className="blog-item">
         <h4> Chỉ có tại Dola Furniture</h4>
  <p><strong>1</strong>  Giảm ngay 20.000đ khi Bạn tạo đơn hàng online</p>
  <p><strong>2</strong>
Nhiều ưu đãi khi trở thành thành viên của Dola </p>
<p><strong>3</strong>
Nhân viên tư vấn và hỗ trợ nhiệt tình</p>
<p> <strong>4</strong>
Cam kết hàng chất lượng. Nói không với hàng kém chất lượng </p>
<p><strong>5</strong>
Miễn phí đổi trả khi sản phẩm phẩm lỗi do sản xuất hoặc vận chuyển </p>
</div>
          <div className="blog-item">
            <h4 >Có thể bạn quan tâm</h4>
            <div className="item-blog">
              <div className="image-blog">
                <img src="https://bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017" alt="" />
              </div>
              <div className="content-blog">
                <p>Thiết kế phòng bếp hiện đại 2020</p>
              </div>
            </div>
            <div className="item-blog">
              <div className="image-blog">
                <img src="https://bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017" alt="" />
              </div>
              <div className="content-blog">
                <p>Thiết kế phòng bếp hiện đại 2020</p>
              </div>
            </div>
            <div className="item-blog">
              <div className="image-blog">
                <img src="https://bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017" alt="" />
              </div>
              <div className="content-blog">
                <p>Thiết kế phòng bếp hiện đại 2020</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="desc" >
          <button className='btn-primary' onClick={() => setShow(false)}>Mô tả sản phẩm</button>
          <button className='btn-primary' onClick={() => setShow(true)}>Bình luận</button>
          <div className="showDescOrComment" >
            {show ? <ShowComment data={dataComment} idProduct={id} reset={reset} handleCreateComment={props.handleCreateComment} /> : <ShowDesc />}
          </div>
        </div>

        <div className="title" >
          <div className="title-child"><h1>Sản phẩm cùng loại</h1><h5></h5></div>

          <hr />
          <em style={{ color: "black" }}>Cập nhật các sản phẩm bán chạy nhất trong tuần</em>
        </div>
        <div className="products-hottrend">
          {relatedProducts?.map((item: any) => (
            <div className="colum" key={item._id}>
              <div className="image">

                <img src={item.image} alt="" />
                <div className="icon">
                  <Link to={`/product/${item._id}`}>  <i onClick={() => restProduct(item._id)} className="fa fa-eye" aria-hidden="true"></i></Link>
                  <i className="fa fa-cart-plus" aria-hidden="true"></i>
                </div>
              </div>
              <div className="content">
                <h3>F1GENZ độc quyền</h3>
                <p>{item.name}</p>
                <strong>{item.price}đ</strong>

              </div>
            </div>
          ))}






        </div>
      </div>
    </div>
  )
}

export default DetailProduct