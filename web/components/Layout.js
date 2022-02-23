import HeadComp from "./Head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ mainNav, page, children, footer }) => (
  <>
    <HeadComp page={page} />
    <section className="wrapper bg-white">
      <Header mainNav={mainNav} />
      <main className="max-w-screen-lg m-auto">{children}</main>
      <Footer footer={footer} />
    </section>
  </>
);

export default Layout;
