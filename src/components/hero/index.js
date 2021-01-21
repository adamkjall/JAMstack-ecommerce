import Image from "next/image";

import Slider from "react-slick";

const Hero = ({ title, images, buttonText }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    // speed: 250,
    // cssEase: "linear",
  };

  return (
    <div className="relative h-full">
      <div className="absolute z-10 inset-0 flex justify-center items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white ">
          {title}
        </h1>
      </div>
      <div className="absolute z-10" style={{ top: "75%", left: "65%" }}>
        <button className="btn btn-black md:text-xl px-6 whitespace-nowrap">
          {buttonText}
        </button>
      </div>
      <Slider {...settings} style={{ filter: "brightness(0.85)" }}>
        {images.map((image) => (
          <Image
            key={image.sys.id}
            src={"https:" + image.fields.file.url}
            // width={image.fields.file.details.image.width}
            // height={image.fields.file.details.image.height * 0.8}
            layout="responsive"
            objectFit="cover"
            width={1900}
            height={980}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
