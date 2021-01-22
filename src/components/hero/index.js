import Image from "next/image";

import Slider from "react-slick";

import styles from "./styles.module.scss";

const Hero = ({ title, images, buttonText }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 0,
    // cssEase: "linear",
  };

  return (
    <div className={styles.heroWrapper}>
      <div className="absolute z-10 inset-0 flex justify-center items-center">
        <h1
          className={`${styles.title} text-7xl md:text-8xl lg:text-8xl xl:text-9xl text-white px-4`}
        >
          {title}
        </h1>
      </div>
      <div className={styles.buttonContainer}>
        <button className="btn btn-black md:text-xl px-6 whitespace-nowrap">
          {buttonText}
        </button>
      </div>
      <Slider {...settings} style={{ filter: "brightness(0.85)" }}>
        {images.map((image) => (
          <img
            key={image.sys.id}
            src={"https:" + image.fields.file.url}
            className={styles.heroImage}
          />
          // <Image
          //   key={image.sys.id}
          //   src={"https:" + image.fields.file.url}
          //   className="hero-image"
          //   // width={image.fields.file.details.image.width}
          //   // height={image.fields.file.details.image.height * 0.8}
          //   layout="responsive"
          //   objectFit="cover"
          //   width={1900}
          //   height={980}
          // />
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
