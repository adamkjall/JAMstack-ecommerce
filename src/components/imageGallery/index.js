import ImageMagnify from "react-image-magnify";
import Slider from "react-slick";

const ImageGallery = ({ images }) => {
  const sliderSettings = {
    dots: true,
    // dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // customPaging: i => <a><img src={images[i]} /></a>
  };
  console.log("image", images[0]);
  return (
    <Slider {...sliderSettings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.node.url320wide} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageGallery;
