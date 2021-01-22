import Image from "next/image";

import styles from "./styles.module.scss";

const Category = ({
  categoryName,
  imageUrl,
  alignButtonX = "center",
  alignButtonY = "center",
}) => (
  <div className={styles.container}>
    <button
      className={`${
        alignButtonX === "right"
          ? "right-0"
          : alignButtonX === "left"
          ? "left-0"
          : ""
      } ${
        alignButtonY === "top"
          ? "top-0"
          : alignButtonY === "bottom"
          ? "bottom-0"
          : ""
      } btn btn-black z-10 absolute bottom-1/4 px-10 text-2xl mx-10 min-w-min w-52`}
    >
      {categoryName}
    </button>
    <Image
      src={"https:" + imageUrl}
      objectFit="cover"
      layout="fill"
      // width={600}
      // height={950}
      alt={`Category ${categoryName}`}
    />
  </div>
);

export default Category;
