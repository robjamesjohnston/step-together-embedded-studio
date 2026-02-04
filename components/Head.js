import Head from "next/head";
import { useRouter } from "next/router";

const HeadComp = ({ pageMeta, siteMeta }) => {
  const router = useRouter();
  const pageTitle = pageMeta?.title || siteMeta?.title || "";
  const siteTitle = siteMeta?.title || "";
  const title = `${pageTitle}${router.pathname === "/" ? "" : ` | ${siteTitle}`}`;
  const description = pageMeta?.description || siteMeta?.description || "";

  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default HeadComp;
