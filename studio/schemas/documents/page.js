export default {
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "clientGroupHighlightCol",
      type: "clientGroupHighlightCol",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
