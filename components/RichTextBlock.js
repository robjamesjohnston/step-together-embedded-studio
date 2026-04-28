import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

import SingleButton from "./SingleButton";
import GroupButtons from "./GroupButtons";

const RichTextBlock = ({ text }) => {
  const colors = {
    bgCol: "bg-green",
    bgHovCol: "hover:bg-green",
    borderCol: "border-green",
    borderHovCol: "hover:border-green",
    textCol: "text-green",
    textHovCol: "hover:text-green",
  };

  const overrides = {
    h2: (props) => <h2 className="mb-8 section-margin text-3xl font-light" {...props} />,
    h3: (props) => <h3 className="mb-8 section-margin text-xl font-bold uppercase tracking-wide" {...props} />,
  };

  const serializers = {
    types: {
      block: (props) =>
        // Check if we have an override for the “style”
        overrides[props.node.style]
          ? // if so, call the function and pass in the children, ignoring
            // the other unnecessary props
            overrides[props.node.style]({ children: props.children })
          : // otherwise, fallback to the provided default with all props
            BlockContent.defaultSerializers.types.block(props),
      singleButton: (props) => <SingleButton buttonProps={props.node} colors={colors} />,
      multipleButtons: (props) => (
        <GroupButtons buttons={props.node.groupButtons} backupCol={colors.bgCol} />
      ),
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
    <section className="my-16">
      <BlockContent
        className={"rich-text text-darkGrey"}
        blocks={text || []}
        serializers={serializers}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </section>
  );
};

export default RichTextBlock;
