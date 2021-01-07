import ImageMagnify from "react-image-magnify";
import Slider from "react-slick";

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

export default ImageGallery;
