import React, { useState } from "react";
import { useRouter } from "next/router";
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

const Donate = ({ mainNav, footer }) => {
  const { query } = useRouter();

  const [frequency, setFrequency] = useState(null);
  const handleFrequency = (event) => setFrequency(event.target.value);

  const [buttonLoading, setbuttonLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setbuttonLoading(true);

    const amount = event.target.amount.value;
    const donationAmount = amount * 100;

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

    window.location = result.authorisation_url;

    setbuttonLoading(false);
  };

  return (
    <Layout
      mainNav={mainNav}
      page={{ title: "Donate" }}
      footer={{
        compInfo: footer.companyInfo,
        socialLinks: {
          fbLink: footer.facebookLink,
          twLink: footer.twitterLink,
          liLink: footer.linkedinLink,
          ytLink: footer.youTubeLink,
        },
      }}
    >
      <article className="mx-4 xs:mx-6 md:mx-8 text-darkGrey">
        <h1 className="text-green mb-8 text-xl font-bold uppercase tracking-wide">
          Make a donation
        </h1>

        {query.status == "success" ? (
          <h2 className="text-3xl font-light">Thank you for your donation</h2>
        ) : (
          <form onSubmit={handleSubmit} className="donate-form flex flex-col">
            <label htmlFor="amount">Amount</label>
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
              placeholder="£"
              className="border-green border-2 h-16 mt-2 mb-8 bg-white p-4"
            />
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
                  />
                </div>
              </div>
              <button
                type="submit"
                className="transition duration-300 border-2 bg-green border-green hover:bg-white uppercase text-xl font-medium tracking-widest text-white hover:text-green p-4 mb-12  h-16 w-full md:w-1/2 md:self-end"
              >
                {buttonLoading ? "Loading" : "Continue"}
              </button>
            </div>
          </form>
        )}
      </article>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const mainNav = await sanityClient.fetch(queryMainNav);
  const footer = await sanityClient.fetch(`*[_id == "footer"][0]{...}`);
  return {
    props: { mainNav, footer },
    revalidate: 1,
  };
};

export default Donate;
