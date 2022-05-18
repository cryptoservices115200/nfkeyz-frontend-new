import Slider from "react-slick";
import { Images_Src } from "../../config/images";

const Carousel = () => {
  const settings = {
    autoplay: true,
    infinite: true,
    lazyLoad: true,
    dots: true,
    arrows: false,
    slidesToShow: 4,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToScroll: 1,
    cssEase: "cubic-bezier(0.070, 0.820, 0.750, 0.750)",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-section">
      <Slider {...settings}>
        {Images_Src.carousel.map((imgSrc, index) => (
          <img src={imgSrc} key={index} alt="key" />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
