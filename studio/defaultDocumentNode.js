import Iframe from "sanity-plugin-iframe-pane";

function getPreviewUrl(doc) {
  return doc?.slug?.current ? `https://www.step-together.org.uk/${doc.slug.current}` : window.location.host;
}

export default (S, { schemaType }) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case "page":
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc) => getPreviewUrl(doc),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
