export default (S) =>
  S.list()
    .title("Content")
    .showIcons(false)
    .items([
      S.listItem().title("Homepage").child(S.editor().schemaType("homepage").documentId("homepage")),
      S.listItem().title("Footer").child(S.editor().schemaType("footer").documentId("footer")),
      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter((listItem) => !["homepage", "footer"].includes(listItem.getId())),
    ]);
