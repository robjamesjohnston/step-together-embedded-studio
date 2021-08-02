import sanityClient from "../client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

const PersonRef = (props) => {
  const personImageProps = useNextSanityImage(sanityClient, props.node.image);
  return (
    <>
      {/* <figure className="aspect-w-1 aspect-h-1">
        <Image
          src={personImageProps.src}
          alt={props.node.altText}
          loader={personImageProps.loader}
          layout="fill"
          objectFit="cover"
        />
      </figure> */}
      <h2>{props.node.name}</h2>
    </>
  );
};

export default PersonRef;
