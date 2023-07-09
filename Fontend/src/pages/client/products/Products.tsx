
import { Button, Checkbox, Pagination, Select, Slider } from 'antd';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../api/config';
import { ICate } from '../../../types/categories';
import { IProduct } from '../../../types/products';
import './products.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IProps {
  products: IProduct[],
  totalPage: number,
  onPage( page: number): void
  onSort(value: any): void
  handlePrice(min: number, max: number): void
  categories: ICate[],
  handleCategoryProducts(id: string): void
  handleAddToCart(data: any): void

}
const Products = (props: IProps) => {
  console.log(props.totalPage);
  const onChangePrice = (value: any) => {
    const min = value[0]
    const max = value[1]
    props.handlePrice(min, max)
  }
 console.log(props.products);
 
  const handleCheckBox = (e: any) => {
    const value = e
    if (value) {
      console.log("Chọn " + value);
    } else {
      console.log("No value")
    }
  }
  const onAddCart = (id: any) => {
   const data={
    productId: id,
    quantity:1,
    userId:JSON.parse(localStorage.getItem('userId')!)
   }
   if(!JSON.parse(localStorage.getItem('userId')!)){
    return toast.error("Bạn chưa đăng nhập")
   }
   props.handleAddToCart(data)
  }

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="banner-product">

      </div>
      <div className="product-main" >
        <div className="product-menu"> <a href="">Trang chủ </a>/Tất cả sản phẩm</div>
        <main>
          <article>
            <div className="cate">
              <h3><i className="fa fa-bars" aria-hidden="true"></i> Danh mục sản phẩm</h3>
              <div className="name-cate">
                {props.categories?.map((item: any) => {
                  return (
                    <Button key={item._id} onClick={() =>props.handleCategoryProducts(item._id)}><img src={item.icon} />{item?.name}</Button>
                  )
                })}

              </div>
            </div>
            <div id="filter">
              <h3 > <i className="fa fa-filter" aria-hidden="true"></i> Bộ lọc</h3>
              <div id="filter-item">
                <h4>Lọc theo giá:</h4>
                <Slider range onChange={onChangePrice} defaultValue={[2000, 5000]} max={5000} />

                <div className="filter-size">
                  <h4 >Lọc theo thương hiệu</h4>
                  <Checkbox.Group onChange={handleCheckBox}>
                    <Checkbox value="value1">Dữ liệu 1</Checkbox>
                    <Checkbox value="value2">Dữ liệu 2</Checkbox>
                    <Checkbox value="value3">Dữ liệu 3</Checkbox>
                  </Checkbox.Group>

                </div>
              </div>
            </div>
            <div className="sale">
              <h3>KHUYẾN MÃI</h3>
              <img src="https://bizweb.dktcdn.net/100/360/933/themes/728303/assets/aside_banner.jpg?1685439552517" alt="" />
            </div>
          </article>
          <aside>
            <Select
              defaultValue="Sắp xếp theo giá"

              onChange={(e) => props.onSort(e)}
              options={[
                { value: "asc", label: 'Tăng dần' },
                { value: "desc", label: 'Giảm dần' },

              ]}
            />
            <div className="products-hottrend" >
              {props.products?.map(item => {
                return (
                  <div className="colum" key={item._id}>
                    <div className="image">

                      <img src={item.image} alt="" />
                      <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>

                      <div className="icon">
                        <Link to={`/product/${item._id}`}>  <i onClick={() => scrollToTop()} className="fa fa-eye" aria-hidden="true"></i></Link>
                        <i onClick={() => onAddCart(item._id)} className="fa fa-cart-plus" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="content">
                      <h3>F1GENZ độc quyền</h3>
                      <p>{item.name}</p>
                      <strong>{item.price}đ</strong>

                    </div>
                  </div>
                )
              })}

            </div>
            <div id='page'>
              <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                defaultCurrent={1} total={props.totalPage}
                onChange={(e) => props.onPage(e)
                } />
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Products