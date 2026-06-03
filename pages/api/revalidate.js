import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "SANITY_WEBHOOK_SECRET not configured" });
  }

  const signature = req.headers["sanity-hook-signature"];
  if (!signature) {
    return res.status(401).json({ error: "Missing webhook signature" });
  }

  const body = JSON.stringify(req.body);
  const hash = crypto.createHmac("sha256", secret).update(body).digest("base64");
  const expectedSignature = `sha256=${hash}`;

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  try {
    const { _type, slug, _id } = req.body;
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
