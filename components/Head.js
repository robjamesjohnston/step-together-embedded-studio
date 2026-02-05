import Head from "next/head";
import { useRouter } from "next/router";

const HeadComp = ({ pageMeta, siteMeta }) => {
  const router = useRouter();
  const pageTitle = pageMeta?.title || siteMeta?.title || "";
  const siteTitle = siteMeta?.title || "";
  const title = `${pageTitle}${router.asPath === "/" ? "" : ` | ${siteTitle}`}`;
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
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://step-together.org.uk${router.asPath}`} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content="https://step-together.org.uk/StepTogetherSocial.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default HeadComp;
