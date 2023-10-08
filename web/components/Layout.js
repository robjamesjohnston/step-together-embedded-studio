import CookieConsent from "react-cookie-consent";

import HeadComp from "./Head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ mainNav, page, children, footer }) => (
  <>
    <HeadComp page={page} />
    <section className="wrapper bg-black bg-opacity-10">
      <Header mainNav={mainNav} />
      <main className="max-w-screen-xl bg-white mx-auto pb-16">{children}</main>
      <Footer footer={footer} />
    </section>
    <CookieConsent
      disableStyles={true}
      containerClasses="w-full fixed bottom-0 left-0 z-999 bg-black opacity-90 text-white text-sm font-light px-4 py-2 flex justify-between items-baseline"
      buttonClasses="text-lime"
    >
      This website uses cookies to enhance the user experience
    </CookieConsent>
  </>
);

export default Layout;
