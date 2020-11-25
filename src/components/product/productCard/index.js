import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const imageData =
    product.node.images.edges.length && product.node.images.edges[0].node;

  return (
    <Link href={"/product" + product.node.path}>
      <a>
        <Image
          src={imageData.urlOriginal || "/"}
          alt={imageData.altText || "Product card"}
          width="300"
          height="300"
        />
      </a>
    </Link>
  );
};

export default ProductCard;
