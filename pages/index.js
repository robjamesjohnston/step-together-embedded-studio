import sanityClient from "../studio/sanityClient";

import Layout from "../components/Layout";
import MainSlider from "../components/MainSlider";
import GroupButtons from "../components/GroupButtons";
import TextBlock from "../components/TextBlock";
import InfoBox from "../components/InfoBox";
import SliderStories from "../components/SliderStories";

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
  mainSlider[]{
    ...,
    target->{_id, slug, title},
    title
  },
  clientGroupButtons[]{
    ...,
    link {
    	external,
    	internal->{_id, slug, title},
  	},
  },
  sections[]{
    ...,
    link {
      external,
      internal->{_id, slug, title},
    },
    sliderImages[]{
      ...,
      target->{_id, slug, title},
    }
  }
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
        twLink: footer.twitterLink,
        liLink: footer.linkedinLink,
        ytLink: footer.youTubeLink,
      },
    }}
  >
    <section className="flex flex-col">
      <MainSlider mainSlider={homepage.mainSlider} />
      <TextBlock text={homepage.siteSummary} />
      <GroupButtons groupButtons={homepage.clientGroupButtons} />

      {homepage.sections.map((item) => {
        return (() => {
          if (item._type === "infoBox") {
            return <InfoBox key={item._key} infoBoxProps={item} />;
          }
          if (item._type === "slider") {
            return <SliderStories key={item._key} sliderStories={item.sliderImages} />;
          }
          if (item._type === "textBlock") {
            return <TextBlock key={item._key} text={item.text} textCol={item.textCol} />;
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
