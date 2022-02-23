import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

import Layout from "../components/Layout";
import ArticleImage from "../components/ArticleImage";
import QuoteBox from "../components/QuoteBox";
import InfoBox from "../components/InfoBox";
import SingleButton from "../components/SingleButton";
import GroupButtons from "../components/GroupButtons";
import People from "../components/People";
import Docs from "../components/Docs";

const queryMainNav = `*[handle == "main-nav"][0]{
  sections[]{
    link{
      target->{_id, slug, title},
      title
    },
    links[]{
      target->{_id, slug, title},
      title
    }
  }
}`;

const queryPage = `*[_type == "page" && slug.current == $slug] {
  title,
  clientGroupHighlightCol,
  body[]{
    ...,
    groupButtons[]{
      ...,
      link {
        external,
        internal->{
          ...,
          "fileURL": file.asset->url
        },
      },
    },
    markDefs[]{
      ...,
      reference->{
        ...,
        "fileURL": file.asset->url
      },
    },
    text[]{
      ...,
      markDefs[]{
        ...,
        reference->{
          ...,
          "fileURL": file.asset->url
        },
      },
    },
    target->{_id, slug, title},
    link {
      external,
      internal->{
        ...,
        "fileURL": file.asset->url
      },
    },
    groupPeople[]{
      "groupPeopleResolved": @->,
    },
    groupDocs[]{
      "fileURL": @->file.asset->url,
      "file": @->,
    }
  }
}[0]`;

const queryAll = `*[_type == "page" && slug.current != ''] {
  'slug': slug.current
}
`;

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const Page = ({ mainNav, page, footer }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={404} />;
  }

  let colors;
  if (page.clientGroupHighlightCol === "red") {
    colors = {
      bgCol: "bg-red",
      bgHovCol: "hover:bg-red",
      borderCol: "border-red",
      borderHovCol: "hover:border-red",
      textCol: "text-red",
      textHovCol: "hover:text-red",
    };
  } else if (page.clientGroupHighlightCol === "lightGreen") {
    colors = {
      bgCol: "bg-lightGreen",
      bgHovCol: "hover:bg-lightGreen",
      borderCol: "border-lightGreen",
      borderHovCol: "hover:border-lightGreen",
      textCol: "text-lightGreen",
      textHovCol: "hover:text-lightGreen",
    };
  } else if (page.clientGroupHighlightCol === "orange") {
    colors = {
      bgCol: "bg-orange",
      bgHovCol: "hover:bg-orange",
      borderCol: "border-orange",
      borderHovCol: "hover:border-orange",
      textCol: "text-orange",
      textHovCol: "hover:text-orange",
    };
  } else if (page.clientGroupHighlightCol === "lime") {
    colors = {
      bgCol: "bg-lime",
      bgHovCol: "hover:bg-lime",
      borderCol: "border-lime",
      borderHovCol: "hover:border-lime",
      textCol: "text-lime",
      textHovCol: "hover:text-lime",
    };
  } else {
    colors = {
      bgCol: "bg-green",
      bgHovCol: "hover:bg-green",
      borderCol: "border-green",
      borderHovCol: "hover:border-green",
      textCol: "text-green",
      textHovCol: "hover:text-green",
    };
  }

  const overrides = {
    h2: (props) => <h2 className={`text-3xl font-light mb-8`} {...props} />,
    h3: (props) => <h3 className="mb-8 text-xl font-bold uppercase tracking-wide" {...props} />,
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
      articleImage: ArticleImage,
      quoteBox: (props) => <QuoteBox quoteBoxProps={props.node} colors={colors} />,
      infoBox: (props) => <InfoBox infoBoxProps={props.node} backupCol={colors} />,
      singleButton: (props) => <SingleButton buttonProps={props.node} colors={colors} />,
      multipleButtons: (props) => (
        <GroupButtons groupButtons={props.node.groupButtons} backupCol={colors.bgCol} />
      ),
      people: (props) => <People peopleProps={props.node.groupPeople} colors={colors} />,
      docs: (props) => <Docs docProps={props.node.groupDocs} colors={colors} />,
    },
    marks: {
      internalLink: (props) => (
        <ConditionalWrapper
          condition={props.mark.reference}
          wrapper={(children) => {
            return (
              <Link
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
    <Layout
      mainNav={mainNav}
      page={page}
      footer={{
        compInfo: footer.companyInfo,
        socialLinks: {
          fbLink: footer.facebookLink,
          twLink: footer.twitterLink,
          liLink: footer.linkedinLink,
          ytLink: footer.youTubeLink,
        },
      }}
    >
      <article className="mx-4 xs:mx-6 md:mx-8 text-darkGrey">
        <h1 className={`${colors.textCol} mb-8 text-xl font-bold uppercase tracking-wide`}>
          {page.title}
        </h1>
        <BlockContent
          className={"content grid grid-col"}
          blocks={page.body}
          serializers={serializers}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        />
      </article>
    </Layout>
  );
};

export const getStaticProps = async (context) => {
  const mainNav = await sanityClient.fetch(queryMainNav);
  const page = await sanityClient.fetch(queryPage, { slug: context.params.slug });
  const footer = await sanityClient.fetch(`*[_id == "footer"][0]{...}`);
  return {
    props: { mainNav, page, footer },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const allPages = (await sanityClient.fetch(queryAll)) || [];
  const paths = allPages.map((page) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: true };
};

export default Page;
