import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getCategory } from "../../api/categories";
import { scrollToTop } from "../../api/config";
import { getProductOutstanding } from "../../api/products";
import { ICate } from "../../types/categories";
import { IProduct } from "../../types/products";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./topProduct.css";
interface IProps {
  handleAddToCart(data: any): void
}

const TopProduct = (props: IProps) => {
  const [categories, setCategories] = useState<ICate[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [banner, setBanner] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.category);

    });

  }, []);
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
  useEffect(() => {
    if (categories.length > 0) {
      showBanner(categories[0]._id, 0); // tự động click vào button đầu tiên
    }
  }, [categories]);

  const showBanner = (id: string, index: number) => {
    // console.log(id);
    getCategory(id).then(({ data }) => {
      setBanner(data.category.banner);
    });
    getProductOutstanding(id).then(({ data }) => {
      setProducts(data.limitProduct);
    })

    setSelectedCategoryIndex(index);
  };

  return (
    <div className="top-product">
      <ToastContainer></ToastContainer>
      <h1>Sản phẩm nổi bật</h1>
      <div className="main-topProduct">
        <div className="cate-topProduct">
          {categories.map((item, index) => (
            <button
              key={item._id}
              className={selectedCategoryIndex === index ? "btn-active" : ""}
              onClick={() => showBanner(item._id, index)}
            >
              <img src={item.icon} alt="" />
              {item.name}
            </button>
          ))}
        </div>
        <div className="banner-topProduct">
          <img id="img-topProduct" src={banner} alt="" />
        </div>
      </div>
      <div className="products-hottrend">
        {products?.map((item: any) => (
          <div className="colum" key={item._id}>
            <div className="image">

              <img src={item.image} alt="" />
              <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>
              <div className="icon">
                <Link to={`/product/` + item._id}> <i onClick={() => scrollToTop()} className="fa fa-eye" aria-hidden="true"></i></Link>
                <i onClick={() => onAddCart(item._id)} className="fa fa-cart-plus" aria-hidden="true"></i>
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
  );
};

export default TopProduct;
