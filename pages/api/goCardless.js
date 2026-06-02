import gocardless from "gocardless-nodejs";
import { Environments } from "gocardless-nodejs/constants";

const GC_ACCESS_TOKEN =
  process.env.NODE_ENV === "production"
    ? process.env.GO_CARDLESS_ACCESS_TOKEN
    : process.env.GO_CARDLESS_ACCESS_TOKEN_DEV;

const GC_ENVIRONMENT = process.env.NODE_ENV === "production" ? Environments.Live : Environments.Sandbox;

const ALLOWED_FREQUENCIES = ["one-off", "monthly"];
const MIN_DONATION = 1;
const MAX_DONATION = 1000000;
const ALLOWED_ORIGINS = [
  "https://step-together.org.uk",
  "https://www.step-together.org.uk",
  process.env.NODE_ENV === "development" && "http://localhost:3000",
].filter(Boolean);

function validateDonationAmount(amount) {
  const num = Number(amount);
  if (!Number.isInteger(num) || num < MIN_DONATION || num > MAX_DONATION) {
    return null;
  }
  return num;
}

function validateFrequency(frequency) {
  return ALLOWED_FREQUENCIES.includes(frequency) ? frequency : null;
}

export default async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  try {
    const { donationAmount, frequency } = req.body;

    const validatedAmount = validateDonationAmount(donationAmount);
    if (validatedAmount === null) {
      return res.status(400).json({
        error: `Donation amount must be an integer between ${MIN_DONATION} and ${MAX_DONATION}`,
      });
    }

    const validatedFrequency = validateFrequency(frequency);
    if (!validatedFrequency) {
      return res.status(400).json({
        error: `Frequency must be one of: ${ALLOWED_FREQUENCIES.join(", ")}`,
      });
    }

    if (!GC_ACCESS_TOKEN) {
      console.error("GoCardless token not configured");
      return res.status(500).json({ error: "Payment service not configured" });
    }

    const client = gocardless(GC_ACCESS_TOKEN, GC_ENVIRONMENT, {
      raiseOnIdempotencyConflict: true,
    });

    const paymentRequest = {
      payment_request: {
        description:
          validatedFrequency === "one-off" ? "One off donation to Step Together" : "First donation to Step Together",
        amount: validatedAmount,
        currency: "GBP",
      },
    };

    if (validatedFrequency === "monthly") {
      paymentRequest.mandate_request = {
        currency: "GBP",
      };
    }

    const billingRequest = await client.billingRequests.create(paymentRequest);
    const redirectUri = validatedFrequency === "one-off" ? "" : "monthly_";

    const baseUrl = process.env.NODE_ENV === "production" ? "https://step-together.org.uk" : "http://localhost:3000";

    const billingRequestFlow = await client.billingRequestFlows.create({
      redirect_uri: `${baseUrl}/donate?status=${redirectUri}donation_success`,
      exit_uri: `${baseUrl}/donate`,
      links: {
        billing_request: billingRequest.id,
      },
    });

    res.status(200).json(billingRequestFlow);
  } catch (error) {
    console.error("GoCardless API error:", error);

    if (error.message?.includes("authentication")) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    if (error.message?.includes("idempotency")) {
      return res.status(409).json({ error: "Duplicate request" });
    }

    res.status(500).json({
      error: process.env.NODE_ENV === "production" ? "Payment service error" : error.message,
    });
  }
}
