import Image from "next/image";
import ImageMagnify from "react-image-magnify";
import Slider from "react-slick";

import BackIcon from "../../../public/icons/back.svg";
import NextIcon from "../../../public/icons/next.svg";

const ImageGallery = ({ images }) => {
  const sliderSettings = {
    dots: true,
    // centerMode: true,
    // centerPadding: "0px",
    dotsClass: "slick-dots slick-thumb",
    lazyload: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    // arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) =>
      i < images.length ? (
        <Image src={images[i]?.node.url160wide} width="80" height="80" />
      ) : (
        <a></a>
      ),
  };

  return (
    <Slider {...sliderSettings}>
      {images.map((image, index) => (
        <div key={index}>
          {/* TODO Optimize with srcSet & size */}
          <ImageMagnify
            {...{
              smallImage: {
                alt: image.node.altText || "Product",
                isFluidWidth: true,
                src: image.node.url640wide,
              },
              largeImage: {
                src: image.node.urlOriginal,
                width: 1000,
                height: 1000,
              },
              enlargedImagePosition: "over",
              enlargedImageClassName: "enlarged-image",
              hoverDelayInMs: 0,
            }}
          />
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
