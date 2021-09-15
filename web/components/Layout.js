import HeadComp from "./Head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ mainNav, page, children }) => (
  <>
    <HeadComp page={page} />
    <section className="wrapper">
      <Header mainNav={mainNav} />
      <main className="max-w-screen-lg m-auto">{children}</main>
      <Footer />
    </section>
  </>
);

export default Layout;
