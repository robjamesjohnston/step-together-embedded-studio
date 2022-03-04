import gocardless from "gocardless-nodejs";
import { Environments } from "gocardless-nodejs/constants";

export default async function (req, res) {
  const client = gocardless(
    process.env.GO_CARDLESS_ACCESS_TOKEN,
    // Change this to Environments.Live when you're ready to go live
    Environments.Sandbox,
    { raiseOnIdempotencyConflict: true }
  );

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

  const billingRequestFlow = await client.billingRequestFlows.create({
    redirect_uri: "https://step-together.org.uk/donate?status=success",
    exit_uri: "https://step-together.org.uk/donate",
    links: {
      billing_request: billingRequest.id,
    },
  });

  res.status(200).json(billingRequestFlow);
}
