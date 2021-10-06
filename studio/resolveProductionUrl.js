const projectUrl = `${
  process.env.NODE_ENV === "production"
    ? "https://step-together.vercel.app"
    : "http://localhost:3000"
}`;

export default function resolveProductionUrl(document) {
  // Only show the preview option for documents for which a preview makes sense
  if (document._type === "page") {
    return `${projectUrl}/${document.slug.current}`;
  }
  return undefined;
}
