import gocardless from "gocardless-nodejs";
import { Environments } from "gocardless-nodejs/constants";

export default async function (req, res) {
  const client = gocardless(
    process.env.GO_CARDLESS_ACCESS_TOKEN,
    // Change this to constants.Environments.Live when you're ready to go live
    Environments.Sandbox,
    { raiseOnIdempotencyConflict: true }
  );

  const oneOffPaymentRequest = {
    payment_request: {
      description: "Donation to Step Together",
      amount: `${req.body.donationAmount}`,
      currency: "GBP",
    },
  };

  const monthlyPaymentRequest = {
    payment_request: {
      description: "Donation to Step Together",
      amount: `${req.body.donationAmount}`,
      currency: "GBP",
    },
    mandate_request: {
      scheme: "bacs",
    },
  };

  const billingRequest = await client.billingRequests.create(
    req.body.frequency === "one-off" ? oneOffPaymentRequest : monthlyPaymentRequest
  );

  const billingRequestFlow = await client.billingRequestFlows.create({
    redirect_uri: "https://step-together.vercel.app/donate", //temp
    exit_uri: "https://step-together.vercel.app", //temp
    links: {
      billing_request: billingRequest.id,
    },
  });

  res.status(200).json(billingRequestFlow);
}
