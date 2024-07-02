export default {
  name: "articleCard",
  type: "object",
  title: "Article card",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "text",
      type: "text",
      title: "Text",
    },
    {
      name: "clientGroupHighlightCol",
      type: "clientGroupHighlightCol",
    },
    {
      name: "link",
      type: "link",
    },
  ],
};
