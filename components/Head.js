import Head from "next/head";
import { useRouter } from "next/router";

const HeadComp = ({ page }) => {
  const router = useRouter();
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <title>{`${page.title}${router.pathname === "/" ? "" : " — Step Together"}`}</title>
    </Head>
  );
};

export default HeadComp;
