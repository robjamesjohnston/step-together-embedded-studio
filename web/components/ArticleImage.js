import sanityClient from "../client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

const ArticleImage = (props) => {
  const blockImageProps = useNextSanityImage(sanityClient, props.node.image);
  return (
    <figure
      // 8, 4, 3 – 16:9
      // 6, 4, 3 – 6:4
      className={`aspect-w-6 my-8 ${
        props.node.alignment === "right"
          ? "aspect-h-4 md:aspect-h-2 md:w-1/2 md:self-end"
          : props.node.alignment === "full"
          ? "aspect-h-4 full-bleed pt-5 xs:pt-8 md:pt-11" // aspect ratio margin hack
          : props.node.alignment === "small"
          ? "aspect-h-2 md:aspect-h-1 w-1/2 md:w-1/4 mx-auto"
          : "aspect-h-4 md:aspect-h-2 md:w-1/2"
      }`}
    >
      <Image
        src={blockImageProps.src}
        alt={props.node.altText}
        loader={blockImageProps.loader}
        layout="fill"
        objectFit="cover"
      />
    </figure>
  );
};

export default ArticleImage;
