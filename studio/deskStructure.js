import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .showIcons(false)
    .items([
      S.listItem()
        .title("Homepage")
        .child(S.editor().schemaType("homepage").documentId("homepage")),
      // Add a visual divider (optional)
      // S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter((listItem) => !["homepage"].includes(listItem.getId())),
    ]);
