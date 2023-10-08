import BlockContent from "@sanity/block-content-to-react";
import { RiExternalLinkLine } from "react-icons/ri";
import Link from "next/link";

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const InfoBox = ({ infoBoxProps, backupCol }) => {
  const { title, text, buttonText, link, bgCol } = infoBoxProps;
  let backgroundCol;
  switch (bgCol) {
    case "lime":
      backgroundCol = "bg-lime";
      break;
    case "darkGrey":
      backgroundCol = "bg-darkGrey";
      break;
    default:
      backgroundCol = "bg-green";
  }

  let textHovCol;
  switch (bgCol) {
    case "lime":
      textHovCol = "hover:text-lime";
      break;
    case "darkGrey":
      textHovCol = "hover:text-darkGrey";
      break;
    default:
      textHovCol = "hover:text-green";
  }

  const serializers = {
    types: {
      block: (props) => BlockContent.defaultSerializers.types.block(props),
    },
    marks: {
      internalLink: (props) => (
        <ConditionalWrapper
          condition={props.mark.reference}
          wrapper={(children) => {
            return (
              <Link
                legacyBehavior
                href={
                  props.mark.reference.slug
                    ? props.mark.reference.slug.current
                    : `${props.mark.reference.fileURL}?dl=`
                }
              >
                <a>{children}</a>
              </Link>
            );
          }}
        >
          {props.children}
        </ConditionalWrapper>
      ),
      link: (props) => (
        <ConditionalWrapper
          condition={props.mark.href}
          wrapper={(children) => {
            return props.mark.blank ? (
              <a href={props.mark.href} target="_blank" rel="noopener">
                {children}
                <RiExternalLinkLine className="inline ml-1 border-0" />
              </a>
            ) : (
              <a href={props.mark.href}>
                {children}
                <RiExternalLinkLine className="inline ml-1 border-0" />
              </a>
            );
          }}
        >
          {props.children}
        </ConditionalWrapper>
      ),
    },
  };

  return (
    <section className={`info-box my-8 ${backgroundCol ? backgroundCol : backupCol.bgCol}`}>
      <div className="max-w-screen-lg m-auto px-4 py-8 xs:px-6 xs:py-12 md:px-8 md:py-16 md:flex md:space-x-8">
        <h2 className="text-white text-3xl pb-2 font-bold tracking-wide uppercase md:w-1/2">
          {title}
        </h2>
        <div className="md:w-1/2 text-white text-xl font-light">
          <BlockContent
            blocks={text}
            serializers={serializers}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          />
          <ConditionalWrapper
            condition={link}
            wrapper={(children) => {
              return link.external ? (
                <a href={link.external} target="_blank" rel="noopener">
                  {children}
                </a>
              ) : (
                <Link
                  legacyBehavior
                  href={
                    link.internal.slug ? link.internal.slug.current : `${link.internal.fileURL}?dl=`
                  }
                >
                  <a>{children}</a>
                </Link>
              );
            }}
          >
            {link && (
              <button
                className={`transition-all duration-300 border-2 border-white hover:bg-white uppercase text-xl font-medium tracking-widest text-white ${
                  textHovCol ? textHovCol : backupCol.textHovCol
                } w-full p-4 mt-4 mb-2`}
              >
                {buttonText}
              </button>
            )}
          </ConditionalWrapper>
        </div>
      </div>
    </section>
  );
};

export default InfoBox;
