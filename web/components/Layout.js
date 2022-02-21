import HeadComp from "./Head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  mainNav,
  page,
  children,
  facebookLink,
  twitterLink,
  linkedinLink,
  youTubeLink,
}) => (
  <>
    <HeadComp page={page} />
    <section className="wrapper bg-white">
      <Header mainNav={mainNav} />
      <main className="max-w-screen-lg m-auto">{children}</main>
      <Footer
        facebookLink={facebookLink}
        twitterLink={twitterLink}
        linkedinLink={linkedinLink}
        youTubeLink={youTubeLink}
      />
    </section>
  </>
);

export default Layout;
