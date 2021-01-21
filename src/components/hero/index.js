import Image from "next/image";

import Slider from "react-slick";

const Hero = ({ title, images, buttonText }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 0,
    autoplaySpeed: 4000,
    // adaptiveHeight: true,
  };
  console.log("image", images[0]);
  return (
    <div className="relative" style={{ height: "40vw" }}>
      <div className="absolute z-10 inset-0 flex justify-center items-center">
        <h1 className="text-9xl text-white ">{title}</h1>
      </div>
      <div
        className="absolute z-10 bottom-0"
        style={{ top: "70%", left: "65%" }}
      >
        <button className="btn btn-black">{buttonText}</button>
      </div>
      <Slider {...settings} style={{ filter: "brightness(0.85)" }}>
        {images.map((image) => (
          <div id={image.id}>
            <Image
              src={"https:" + image.fields.file.url}
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
              objectFit="cover"
              quality="100"
              layout="responsive"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
