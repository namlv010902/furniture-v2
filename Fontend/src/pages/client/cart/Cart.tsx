import { InputNumber, Form, Radio } from 'antd'
import './cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { ICart } from '../../../types/cart'
import { Button, Checkbox, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {useEffect} from "react"
interface IProps {
  cart: ICart
  updateCart(data: any): void
  removeOneProductInCart(productId: string): void
  handleCreateOrder(data: any): void
}
const Cart = (props: IProps) => {
  const navigate = useNavigate()
  const idUser = JSON.parse(localStorage.getItem('userId')!);
  console.log(idUser);
  useEffect(()=>{
  if(!idUser){
    navigate("/auth/login")
  }
  },[])

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  let amount = 0
  console.log(props.cart);
  const cartId = props.cart?._id
  const userId = JSON.parse(localStorage.getItem('userId')!);
  const onFinish = (values: any) => {
    values["userId"] = userId;
    values["cartId"] = cartId;
    console.log('Success:', values);
    Swal.fire({
      title: 'Bạn chắc chắn chứ ',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oki'
    }).then((result: any) => {
      if (result.isConfirmed) {
        props.handleCreateOrder(values)
        Swal.fire(
          'Đặt hàng thành công!',
          'Đơn hàng của bạn đã được khởi tạo.',
          'success'
        )
      }
    })

  };
 
  const onUpdateCart = (value: number, productId: string) => {
    console.log(value, idUser, productId);
    const data = {
      quantity: value,
      userId: idUser,
      productId: productId
    }
    if (value == 0 || !value) {
      if (window.confirm("Xóa sản phẩm khỏi giỏ hàng")) {
        props.removeOneProductInCart(productId)
        alert("Đã xóa sản phẩm khỏi giỏ hàng")  }
    } else {
      props.updateCart(data)
    }
  }
  const removeInCart = (productId: string) => {

    console.log(productId, idUser);
    props.removeOneProductInCart(productId);
  }

  return (
    <div>
      <ToastContainer></ToastContainer>

      <div className="order-main">
        <div className="menuChild">
          <Link to="/">Home/</Link> <p> Giỏ hàng của bạn</p>
        </div>
        {props.cart?.products ?
          <div id="show-cart">

            <table id='cart'>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sum</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {props.cart.products?.map((item: any) => {



                  let sum = item.productId.price * item.quantity


                  return (
                    <tr key={item._id}>
                      <td>{item.productId.name}</td>
                      <td><Link to={`/product/${item.productId._id}`} ><img src={item.productId.image} alt="" /></Link></td>
                      <td style={{ color: "#fca120" }}> ${item.productId.price}</td>
                      <td>

                        <InputNumber min={1} defaultValue={item.quantity} onChange={(e) => onUpdateCart(e, item.productId._id)} />

                      </td>
                      <td>${sum}</td>
                      <td><button className='btn-removeCart' onClick={() => removeInCart(item.productId._id)} ><i className="fa-regular fa-circle-xmark"></i></button></td>
                    </tr>
                  )
                })}


              </tbody>


            </table>
            <div className="OrderForm" >
              <p>Thông tin nhận hàng</p>
              <Form
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                id="formCheckOut"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Tên khách hàng"
                  name="customerName"
                  rules={[{ required: true, message: 'Please input your phone!' }]}
                  initialValue="Lê Thánh Nam"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone!' }]}
                  initialValue="0565079665"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ghi chú"
                  name="note"

                >
                  <Input />
                </Form.Item>
                <Form.Item

                >
                  <Radio defaultChecked>Thanh toán khi nhận hàng </Radio>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Đặt hàng ngay
                  </Button>
                </Form.Item>
              </Form>
              <div className="total-cart">
                <h3 style={{ color: "#ee4d2d" }}>Tổng thanh toán: $
                  {props.cart?.totalPrice ? props.cart?.totalPrice : amount}
                </h3>
              </div>
            </div>

          </div>
          : <div className='cart-err'>
            <img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/empty-bags.jpg?1541753997372" alt="" />
            {/* <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="" />
      <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" />
      <img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="" /> */}

            <Link to="/products"> <Button>Tiếp tục lựa chọn</Button></Link></div>

        }

      </div>
    </div>
  )
}

export default Cart