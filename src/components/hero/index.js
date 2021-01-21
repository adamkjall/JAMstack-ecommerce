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
    <div className="relative" style={{ height: "40vw" }}>
      <div className="absolute z-10 inset-0 flex justify-center items-center">
        <h1 className="text-9xl text-white ">{title}</h1>
      </div>
      <div
        className="absolute z-10 bottom-0"
        style={{ top: "75%", left: "65%" }}
      >
        <button className="btn btn-black text-2xl px-6">{buttonText}</button>
      </div>
      <Slider {...settings}>
        {images.map((image) => (
          <div id={image.id} style={{ filter: "brightness(0.85)" }}>
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
