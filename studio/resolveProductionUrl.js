export default function resolveProductionUrl(document) {
  // Only show the preview option for documents for which a preview makes sense
  if (document._type === "page") {
    return `https://step-together.vercel.app/${document.slug.current}`;
  }
  return undefined;
}
