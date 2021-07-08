export default {
  name: "infoBox",
  type: "object",
  title: "Info box",
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
      name: "buttonText",
      type: "string",
      title: "Button text",
    },
    {
      name: "target",
      type: "reference",
      title: "Target",
      to: [{ type: "page" }],
    },
    {
      name: "bgCol",
      type: "string",
      title: "Background colour",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Lime", value: "lime" },
          { title: "Dark grey", value: "darkGrey" },
        ],
      },
    },
  ],
};
