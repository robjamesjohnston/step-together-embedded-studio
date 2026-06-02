import React, { useState } from "react";
import { useRouter } from "next/router";
import sanityClient from "../studio/sanityClient";

import Layout from "../components/Layout";
import RichTextBlock from "../components/RichTextBlock";

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

const Donate = ({ mainNav, homepage, donate, footer }) => {
  const { query } = useRouter();

  const [frequency, setFrequency] = useState(null);
  const handleFrequency = (event) => setFrequency(event.target.value);

  const [buttonLoading, setbuttonLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setbuttonLoading(true);

    try {
      const amount = event.target.amount.value;
      const donationAmount = Math.round(amount * 100);

      const res = await fetch("/api/goCardless", {
        body: JSON.stringify({
          donationAmount: donationAmount,
          frequency: frequency,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Payment service error. Please try again.");
        setbuttonLoading(false);
        return;
      }

      if (!result.authorisation_url) {
        setError("Invalid payment response. Please try again.");
        setbuttonLoading(false);
        return;
      }

      window.location = result.authorisation_url;
    } catch (err) {
      console.error("Donation error:", err);
      setError("Network error. Please check your connection and try again.");
      setbuttonLoading(false);
    }
  };

  return (
    <Layout
      mainNav={mainNav}
      headerLogo={homepage.headerLogo}
      pageMeta={{
        title: donate.metaTitle || donate.title,
        description: donate.metaDescription,
      }}
      siteMeta={{
        title: homepage.siteTitle,
        description: homepage.siteDescription,
      }}
      footer={{
        compInfo: footer.companyInfo,
        socialLinks: {
          fbLink: footer.facebookLink,
          inLink: footer.instagramLink,
          twLink: footer.twitterLink,
          liLink: footer.linkedInLink,
          ytLink: footer.youTubeLink,
        },
      }}
    >
      <article className="text-darkGrey pb-16">
        <h1 className="text-green mb-8 text-xl font-bold uppercase tracking-wide section-margin xl:pt-6">
          {donate.title}
        </h1>

        {donate.richTextBlock && <RichTextBlock text={donate.richTextBlock.text} />}

        <div className="section-margin">
          {query.status == "donation_success" ? (
            <h2 className="text-3xl font-light">Thank you for your donation</h2>
          ) : query.status == "monthly_donation_success" ? (
            <h2 className="text-3xl font-light">Thank you for monthly donation</h2>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="donate-form flex flex-col max-w-screen-sm mx-auto">
                <label htmlFor="amount">Amount</label>
                <div className="flex border-green border-2 h-16 mb-8">
                  <div className="flex justify-center items-center w-1/12">
                    <span className="text-green text-4xl">£</span>
                  </div>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    pattern="^\d+(?:\.\d{1,2})?$"
                    step="0.01"
                    min="1"
                    max="5000"
                    autoComplete="amount"
                    required
                    className="text-2xl font-medium tracking-widest text-darkGrey py-4 pr-4 w-11/12"
                    disabled={buttonLoading}
                  />
                </div>
                <div className="md:flex">
                  <div className="flex md:w-1/2 mb-12">
                    <div className="w-1/2">
                      <label htmlFor="one-off">One off donation</label>
                      <input
                        id="one-off"
                        value="one-off"
                        name="frequency"
                        type="radio"
                        required
                        className="block appearance-none border-green border-2 h-16 w-16 mt-2 checked:bg-green"
                        checked={frequency === "one-off"}
                        onChange={handleFrequency}
                        disabled={buttonLoading}
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="monthly">Monthly donation</label>
                      <input
                        id="monthly"
                        value="monthly"
                        name="frequency"
                        type="radio"
                        required
                        className="block appearance-none border-green border-2 h-16 w-16 mt-2 checked:bg-green"
                        checked={frequency === "monthly"}
                        onChange={handleFrequency}
                        disabled={buttonLoading}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={buttonLoading}
                    className="transition duration-300 border-2 bg-green border-green hover:bg-white uppercase text-xl font-medium tracking-widest text-white hover:text-green p-4 mb-12  h-16 w-full md:w-1/2 md:self-end disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {buttonLoading ? "Processing" : "Continue"}
                  </button>
                </div>
              </form>
              {error && (
                <div className="h-16 max-w-screen-sm mx-auto flex items-center justify-center bg-red text-white">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const mainNav = await sanityClient.fetch(queryMainNav);
  const homepage = await sanityClient.fetch(`*[_id == "homepage"][0]{headerLogo, siteTitle, siteDescription}`);
  const donate = await sanityClient.fetch(`*[_id == "donate"][0]{...}`);
  const footer = await sanityClient.fetch(`*[_id == "footer"][0]{...}`);
  return {
    props: { mainNav, homepage, donate, footer },
    revalidate: 1,
  };
};

export default Donate;
