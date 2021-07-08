export default {
  name: "navSection",
  type: "object",
  title: "Section",
  preview: {
    select: {
      title: "link.title",
      targetTitle: "link.target.title",
    },
    prepare: ({ title, targetTitle }) => ({
      title: title || targetTitle,
    }),
  },
  fields: [
    {
      name: "link",
      type: "navLink",
      title: "Link",
    },
    {
      name: "links",
      type: "array",
      title: "Links",
      of: [{ type: "navLink" }],
    },
  ],
};
