export default {
  name: "groupButton",
  type: "object",
  title: "Group button",
  fields: [
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
      type: "string",
      title: "Client group or highlight colour",
      description: "Choose a client group if appropriate or choose a highlight colour",
      options: {
        list: [
          { title: "Young people", value: "bg-red" },
          { title: "Ex-offenders", value: "bg-lightGreen" },
          { title: "WIS and veterans", value: "bg-orange" },
          { title: "Green", value: "bg-green" },
          { title: "Lime", value: "bg-lime" },
        ],
      },
    },
    {
      name: "target",
      type: "reference",
      title: "Target",
      to: [{ type: "page" }],
    },
  ],
};
