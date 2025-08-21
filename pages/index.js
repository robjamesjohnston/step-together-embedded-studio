import sanityClient from "../studio/sanityClient";

import Layout from "../components/Layout";
import MainSlider from "../components/MainSlider";
import GroupButtons from "../components/GroupButtons";
import InfoBox from "../components/InfoBox";
import TextBlock from "../components/TextBlock";
import Slider from "../components/Slider";
import ArticleImage from "../components/ArticleImage";
import ArticleCards from "../components/ArticleCards";

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

const queryHomepage = `*[_id == "homepage"][0]{
  ...,
  sections[]{
    ...,
    link {
      external,
      internal->{_id, slug, title},
    },
    sliderImages[]{
      ...,
      target->{_id, slug, title},
    },
    groupButtons[]{
      ...,
      link {
        external,
        internal->{_id, slug, title},
      },
    },
    articles[]{
      ...,
      link {
        external,
        internal->{_id, slug, title},
      },
    },
  },
}`;

const IndexPage = ({ mainNav, homepage, footer }) => (
  <Layout
    mainNav={mainNav}
    headerLogo={homepage.headerLogo}
    page={{ title: homepage.siteTitle }}
    footer={{
      compInfo: footer.companyInfo,
      socialLinks: {
        fbLink: footer.facebookLink,
        inLink: footer.instagramLink,
        twLink: footer.twitterLink,
        liLink: footer.linkedInLink,
        ytLink: footer.youTubeLink,
      },
    }}
  >
    <section className="flex flex-col">
      {homepage.sections.map((item) => {
        return (() => {
          if (item._type === "mainSlider") {
            return <MainSlider key={item._key} slides={item.sliderImages} />;
          }
          if (item._type === "clientGroups") {
            return <GroupButtons key={item._key} buttons={item.groupButtons} backupCol={"bg-green"} />;
          }
          if (item._type === "infoBox") {
            return <InfoBox key={item._key} infoBoxProps={item} />;
          }
          if (item._type === "textBlock") {
            return <TextBlock key={item._key} text={item.text} textCol={item.textCol} />;
          }
          if (item._type === "slider") {
            return <Slider key={item._key} slides={item.sliderImages} />;
          }
          if (item._type === "articleImage") {
            return <ArticleImage key={item._key} imageProps={item} isHomepage={true} />;
          }
          if (item._type === "homeArticleCards") {
            return <ArticleCards key={item._key} articles={item.articles} backupCol={"bg-green"} />;
          }
        })();
      })}
    </section>
  </Layout>
);

export const getStaticProps = async () => {
  const mainNav = await sanityClient.fetch(queryMainNav);
  const homepage = await sanityClient.fetch(queryHomepage);
  const footer = await sanityClient.fetch(`*[_id == "footer"][0]{...}`);
  return {
    props: { mainNav, homepage, footer },
    revalidate: 1,
  };
};

export default IndexPage;
