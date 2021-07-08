export default {
  name: "textBlock",
  type: "object",
  title: "Text block",
  preview: {
    select: {
      title: "text",
    },
  },
  fields: [
    {
      name: "text",
      type: "text",
      title: "Text",
    },
    {
      name: "textCol",
      type: "string",
      title: "Text colour",
      options: {
        list: [
          { title: "Green", value: "text-green" },
          { title: "Lime", value: "text-lime" },
          { title: "Dark grey", value: "text-darkGrey" },
        ],
      },
    },
  ],
};
