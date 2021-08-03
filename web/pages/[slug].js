import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

import Layout from "../components/Layout";
import ArticleImage from "../components/ArticleImage";
import People from "../components/People";
import QuoteBox from "../components/QuoteBox";
import InfoBox from "../components/InfoBox";
import SingleButton from "../components/SingleButton";
import GroupButtons from "../components/GroupButtons";

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
      target->{_id, slug, title},
    },
    markDefs[]{
      ...,
      reference->{_id, slug, title},
    },
    target->{_id, slug, title},
    // "personRefResolved": @->,
    groupPeople[]{
      "groupPeopleResolved": @->,
    }
  }
}[0]`;

const queryAll = `*[_type == "page" && slug.current != ''] {
  'slug': slug.current
}
`;

const Page = ({ mainNav, page }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
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
      // personRef: (props) => <Person personProps={props.node.personRefResolved} colors={colors} />,
      people: (props) => <People peopleProps={props.node.groupPeople} colors={colors} />,
      quoteBox: (props) => <QuoteBox quoteBoxProps={props.node} colors={colors} />,
      infoBox: (props) => <InfoBox infoBoxProps={props.node} backupCol={colors} />,
      singleButton: (props) => <SingleButton buttonProps={props.node} colors={colors} />,
      multipleButtons: (props) => (
        <GroupButtons groupButtons={props.node.groupButtons} backupCol={colors.bgCol} />
      ),
    },
    marks: {
      internalLink: (props) => (
        <Link href={props.mark.reference.slug.current}>
          <a>{props.children}</a>
        </Link>
      ),
      link: (props) => {
        return props.mark.blank ? (
          <a href={props.mark.href} target="_blank" rel="noopener">
            {props.children}
            <RiExternalLinkLine className="inline ml-1 border-0" />
          </a>
        ) : (
          <a href={props.mark.href}>
            {props.children}
            <RiExternalLinkLine className="inline ml-1 border-0" />
          </a>
        );
      },
    },
  };

  return (
    <Layout mainNav={mainNav} page={page}>
      <article className="mx-4 xs:mx-6 md:mx-8 text-darkGrey">
        <h1 className={`${colors.textCol} text-xl font-bold uppercase tracking-wide`}>
          {page.title}
        </h1>
        <BlockContent
          className={"content text-lg flex flex-col"}
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
  return {
    props: { mainNav, page },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const allPages = (await sanityClient.fetch(queryAll)) || [];
  const paths = allPages.map((page) => ({
    params: { slug: page.slug },
  }));
  return { paths, fallback: false };
};

export default Page;
