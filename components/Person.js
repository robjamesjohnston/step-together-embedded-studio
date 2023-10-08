import { useState } from "react";
import sanityClient from "../studio/sanityClient";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const personImageBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, 1920))
    .quality(options.quality || 75)
    .fit("clip")
    .saturation(-100);
};

const Person = ({ name, job, area, bio, image, colors }) => {
  const personImageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: personImageBuilder,
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const openBio = () => {
    setOpen(true);
  };

  const closeBio = () => {
    setOpen(false);
  };

  return (
    <section>
      {image && (
        <figure className="relative aspect-w-1 aspect-h-1 mb-4">
          <Image
            className="rounded-full"
            src={personImageProps.src}
            alt={name}
            loader={personImageProps.loader}
            fill={true}
            style={{objectFit: "cover"}}
            loading="lazy"
          />
        </figure>
      )}
      <p className={`${colors.textCol} uppercase font-bold`}>{name}</p>
      <p className="uppercase font-bold">{job}</p>
      <p className="font-light">{area}</p>
      {open ? (
        <MdExpandLess onClick={closeBio} className={`${colors.textHovCol} text-3xl transition-all duration-300`} />
      ) : (
        <MdExpandMore onClick={openBio} className={`${colors.textHovCol} text-3xl transition-all duration-300`} />
      )}
      <div onClick={handleClick} className={`${open || "hidden"}`}>
        <p className="font-light">{bio}</p>
      </div>
    </section>
  );
};

export default Person;
