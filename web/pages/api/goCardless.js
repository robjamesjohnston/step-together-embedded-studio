import gocardless from "gocardless-nodejs";
import { Environments } from "gocardless-nodejs/constants";

const GC_ACCESS_TOKEN =
  process.env.NODE_ENV === "production"
    ? process.env.GO_CARDLESS_ACCESS_TOKEN
    : process.env.GO_CARDLESS_ACCESS_TOKEN_DEV;

const GC_ENVIRONMENT =
  process.env.NODE_ENV === "production" ? Environments.Live : Environments.Sandbox;

export default async function (req, res) {
  const client = gocardless(GC_ACCESS_TOKEN, GC_ENVIRONMENT, {
    raiseOnIdempotencyConflict: true,
  });

  const oneOffPaymentRequest = {
    payment_request: {
      description: "One off donation to Step Together",
      amount: `${req.body.donationAmount}`,
      currency: "GBP",
    },
  };

  const monthlyPaymentRequest = {
    payment_request: {
      description: "First donation to Step Together",
      amount: `${req.body.donationAmount}`,
      currency: "GBP",
    },
    mandate_request: {
      currency: "GBP",
    },
  };

  const billingRequest = await client.billingRequests.create(
    req.body.frequency === "one-off" ? oneOffPaymentRequest : monthlyPaymentRequest
  );

  const redirectUri = req.body.frequency === "one-off" ? "" : "monthly_";

  const billingRequestFlow = await client.billingRequestFlows.create({
    redirect_uri: `https://step-together.org.uk/donate?status=${redirectUri}donation_success`,
    exit_uri: "https://step-together.org.uk/donate",
    links: {
      billing_request: billingRequest.id,
    },
  });

  res.status(200).json(billingRequestFlow);
}
