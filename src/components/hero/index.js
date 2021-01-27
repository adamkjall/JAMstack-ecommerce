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
          className={`${styles.title} text-7xl md:text-8xl lg:text-8xl xl:text-9xl text-white px-4 font-knewave`}
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
            srcSet={`
              https:${image.fields.file.url} 1920w,
              https:${image.fields.file.url}?w=1340&h=900 1340w,
              https:${image.fields.file.url}?w=960&h=640 960w,
              https:${image.fields.file.url}?w=576&h=384 576w,
              https:${image.fields.file.url}?w=384&h=256 384w,
            `}
            className={styles.heroImage}
            alt="hero"
          />
        ))}
      </Slider>
    </div>
  );
};
// w 395 384
// h 188 256
export default Hero;
