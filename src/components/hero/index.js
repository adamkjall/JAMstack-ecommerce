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
    <div className="relative">
      <div className="absolute z-10 inset-0 flex justify-center items-center">
        <h1 className="text-9xl text-white ">{title}</h1>
      </div>
      <div
        className="absolute z-10 bottom-0"
        style={{ top: "75%", left: "65%" }}
      >
        <button className="btn btn-black text-2xl px-6">{buttonText}</button>
      </div>
      <Slider {...settings} style={{ filter: "brightness(0.85)" }}>
        {images.map((image) => (
          <Image
            key={image.sys.id}
            src={"https:" + image.fields.file.url}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height * 0.75}
            objectFit="cover"
            quality="85"
            layout="responsive"
          />
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
