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
      type: "string",
      title: "Client group or highlight colour",
      description: "Choose a client group if appropriate or choose a highlight colour",
      options: {
        list: [
          { title: "Young people", value: "red" },
          { title: "Ex-offenders", value: "lightGreen" },
          { title: "WIS and veterans", value: "orange" },
          { title: "Green", value: "green" },
          { title: "Lime", value: "lime" },
        ],
      },
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
