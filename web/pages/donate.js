import sanityClient from "../client";
import Layout from "../components/Layout";

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

const Donate = ({ mainNav }) => {
  console.log("WIP");

  return (
    <Layout mainNav={mainNav} page={{ title: "Donate" }}>
      <h1>Donate</h1>

      <form>
        <label htmlFor="amount">Donation Amount</label>
        <input id="amount" type="text" autoComplete="amount" required />
        <button type="submit">Continue</button>
      </form>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const mainNav = await sanityClient.fetch(queryMainNav);
  return {
    props: { mainNav },
    revalidate: 1,
  };
};

export default Donate;
