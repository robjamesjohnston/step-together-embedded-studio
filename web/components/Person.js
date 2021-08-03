import { useState } from "react";
import sanityClient from "../client";
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
        <figure className="aspect-w-1 aspect-h-1 mb-4">
          <Image
            className="rounded-full"
            src={personImageProps.src}
            alt={name}
            loader={personImageProps.loader}
            layout="fill"
            objectFit="cover"
          />
        </figure>
      )}
      <p className={`${colors.textCol} uppercase font-bold`}>{name}</p>
      <p className="uppercase font-bold">{job}</p>
      <p className="font-light">{area}</p>
      {open ? (
        <MdExpandLess onClick={closeBio} className="text-3xl" />
      ) : (
        <MdExpandMore onClick={openBio} className={`${colors.textCol} text-3xl`} />
      )}
      <div onClick={handleClick} className={`${open || "hidden"}`}>
        <p className="font-light">{bio}</p>
      </div>
    </section>
  );
};

export default Person;
