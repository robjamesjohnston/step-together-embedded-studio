import sanityClient from "../studio/sanityClient";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const ArticleCard = ({ image, title, text, bgCol, link }) => {
  const cardImageProps = useNextSanityImage(sanityClient, image);

  return (
    <ConditionalWrapper
      condition={link}
      wrapper={(children) => {
        return link.external ? (
          <a
            href={link.external}
            target={link.external === "https://step-together.org.uk/donate" ? "_self" : "_blank"}
            rel="noopener"
          >
            {children}
          </a>
        ) : (
          <Link legacyBehavior href={link.internal.slug ? link.internal.slug.current : `${link.internal.fileURL}?dl=`}>
            <a>{children}</a>
          </Link>
        );
      }}
    >
      <div
        className={`article-card h-full p-4 flex flex-col text-white ${bgCol} ${
          link && "cursor-pointer hover:opacity-75 transition-all"
        }`}
      >
        {image && (
        <figure className="relative aspect-w-1 aspect-h-1 mb-4">
          <Image
            src={cardImageProps.src}
            alt={title}
            loader={cardImageProps.loader}
            fill={true}
            style={{objectFit: "cover"}}
            loading="lazy"
          />
        </figure>
      )}
        <h2 className="text-3xl xs:text-5xl md:text-3xl font-bold uppercase tracking-wide pb-4">{title}</h2>
        <p className="text-xl font-light w-full">{text}</p>
      </div>
    </ConditionalWrapper>
  );
};

export default ArticleCard;
