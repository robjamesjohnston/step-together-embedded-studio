import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import ConditionalWrapper from "../utils/ConditionalWrapper";
import { GrFacebookOption, GrInstagram, GrTwitter, GrLinkedinOption, GrYoutube } from "react-icons/gr";
import { RiExternalLinkLine } from "react-icons/ri";

const Footer = ({ footer }) => {
  const { compInfo, richCompInfo, socialLinks } = footer;
  const { fbLink, inLink, twLink, liLink, ytLink } = socialLinks;

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
      link: (props) => {
        const isMailto = props.mark.href?.startsWith("mailto:");
        return (
          <ConditionalWrapper
            condition={props.mark.href}
            wrapper={(children) => {
              if (isMailto) {
                return <a href={props.mark.href}>{children}</a>;
              }
              return props.mark.blank ? (
                <a href={props.mark.href} target="_blank" rel="noopener noreferrer">
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
        );
      },
    },
  };

  return (
    <footer className="max-w-screen-xl mx-auto">
      <div className="bg-darkGrey">
        <ul className="p-8 flex justify-center text-3xl text-lime">
          {fbLink && (
            <li className="mx-2">
              <a href={fbLink} target="_blank" rel="noopener noreferrer">
                <GrFacebookOption />
              </a>
            </li>
          )}
          {inLink && (
            <li className="mx-2">
              <a href={inLink} target="_blank" rel="noopener noreferrer">
                <GrInstagram />
              </a>
            </li>
          )}
          {twLink && (
            <li className="mx-2">
              <a href={twLink} target="_blank" rel="noopener noreferrer">
                <GrTwitter />
              </a>
            </li>
          )}
          {liLink && (
            <li className="mx-2">
              <a href={liLink} target="_blank" rel="noopener noreferrer">
                <GrLinkedinOption />
              </a>
            </li>
          )}
          {ytLink && (
            <li className="mx-2">
              <a href={ytLink} target="_blank" rel="noopener noreferrer">
                <GrYoutube />
              </a>
            </li>
          )}
        </ul>
        {richCompInfo && (
          <div className="footer-info mx-4 text-center text-white text-xs font-light">
            <BlockContent
              blocks={richCompInfo || []}
              serializers={serializers}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            />
          </div>
        )}
        <Link legacyBehavior href={"/"} passHref>
          <img src="/icon.svg" className="w-24 p-8 mx-auto cursor-pointer" alt="Step Together" />
        </Link>
      </div>
      <div className="flex justify-center items-center bg-black text-white text-xs font-light">
        <div className="mx-2 p-2 flex">
          &copy; {new Date().getFullYear()} Step Together Volunteering
          <span className="mx-2">|</span>
          Built by&nbsp;
          <a href="https://rhworks.co" className="border-b" target="_blank" rel="noopener noreferrer">
            R H Works
            <RiExternalLinkLine className="inline ml-1 border-0 mb-1" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
