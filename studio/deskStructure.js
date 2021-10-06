import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";
import resolveProductionUrl from "./resolveProductionUrl";

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Give all documents the preview,
  // as well as the default form view
  if (schemaType === "page") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title("Preview"),
    ]);
  }
};

export default () =>
  S.list()
    .title("Content")
    .showIcons(false)
    .items([
      S.listItem()
        .title("Homepage")
        .child(S.editor().schemaType("homepage").documentId("homepage")),
      // // Add a visual divider (optional)
      // S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter((listItem) => !["homepage"].includes(listItem.getId())),
    ]);
