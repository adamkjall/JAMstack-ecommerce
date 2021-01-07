import ImageMagnify from "react-image-magnify";
import Slider from "react-slick";

import BackIcon from "../../../public/icons/back.svg";
import NextIcon from "../../../public/icons/next.svg";

const ImageGallery = ({ images }) => {
  const sliderSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    lazyload: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <a>
        <img src={images[i].node.url160wide} />
      </a>
    ),
  };

  console.log("image", images[0]);
  return (
    <Slider {...sliderSettings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.node.url640wide} />
        </div>
      ))}
    </Slider>
  );
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <NextIcon
      className={className}
      style={{
        ...style,
        display: "block",
        width: "30px",
        height: "40px",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BackIcon
      className={className}
      style={{ ...style, display: "block", width: "30px", height: "40px" }}
      onClick={onClick}
    />
  );
}

export default ImageGallery;
