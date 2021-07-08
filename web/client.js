import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-07-08", // use a UTC date string
  token: "", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});
