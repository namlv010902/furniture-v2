
import Slider from 'react-slick';
import "./banner.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://bizweb.dktcdn.net/100/482/001/themes/906081/assets/home_slider_item_image_2.png?1687164764867',
  'https://bizweb.dktcdn.net/100/482/001/themes/906081/assets/home_slider_item_image_1.png?1687164764867',
  'https://bizweb.dktcdn.net/100/482/001/themes/906081/assets/home_slider_item_image_3.png?1687164764867',
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
  };

  return (
    <div className='banner'>
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default Carousel;
