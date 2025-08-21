import sanityClient from "../studio/sanityClient";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

const ArticleImage = ({ imageProps, isHomepage }) => {
  const { image, alignment, altText } = imageProps;
  const blockImageProps = useNextSanityImage(sanityClient, image);
  return (
    <figure
      // 8, 4, 3 – 16:9
      // 6, 4, 3 – 6:4
      className={`relative aspect-w-6 ${!isHomepage ? "my-8" : ""} ${
        alignment === "right"
          ? "aspect-h-4 md:aspect-h-2 md:w-1/2 md:self-end"
          : alignment === "full"
          ? "aspect-h-4 full-bleed pt-5 xs:pt-8 md:pt-11" // aspect ratio margin hack
          : alignment === "small"
          ? "aspect-h-2 md:aspect-h-1 w-1/2 md:w-1/4 mx-auto"
          : "aspect-h-4 md:aspect-h-2 md:w-1/2"
      }`}
    >
      <Image
        src={blockImageProps.src}
        alt={altText}
        loader={blockImageProps.loader}
        fill={true}
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
    </figure>
  );
};

export default ArticleImage;
