import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Disable default body parser so we can get the uncorrupted raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "SANITY_WEBHOOK_SECRET not configured" });
  }

  // 1. Correct header key
  const signature = req.headers[SIGNATURE_HEADER_NAME] || req.headers["sanity-webhook-signature"];

  if (!signature) {
    return res.status(401).json({ error: "Missing webhook signature" });
  }

  // 2. Read raw unparsed body
  const rawBody = await getRawBody(req);

  // 3. Verify signature safely
  const isValid = await isValidSignature(rawBody, signature, secret);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  // 4. Parse JSON payload manually
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  try {
    const { _type, slug } = body;
    const paths = getPaths(_type, slug);

    if (paths.length === 0) {
      return res.json({ message: "No paths to revalidate for this document" });
    }

    for (const path of paths) {
      await res.revalidate(path);
    }

    console.log(`Revalidated paths: ${paths.join(", ")}`);
    return res.json({
      revalidated: true,
      paths,
      message: `Revalidated ${paths.length} path(s)`,
    });
  } catch (error) {
    console.error("Revalidate error:", error);
    return res.status(500).json({
      error: "Revalidation failed",
      message: error.message,
    });
  }
}

function getPaths(docType, slug) {
  const paths = [];

  if (docType === "homepage") {
    paths.push("/");
  } else if (docType === "donate") {
    paths.push("/donate");
  } else if (docType === "page" && slug?.current) {
    paths.push(`/${slug.current}`);
  } else if (docType === "nav" || docType === "footer") {
    paths.push("/", "/donate");
  }

  return [...new Set(paths)];
}
