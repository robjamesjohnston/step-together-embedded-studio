export default {
  name: "navLink",
  type: "object",
  title: "Link",
  preview: {
    select: {
      title: "title",
      targetTitle: "target.title",
    },
    prepare: ({ title, targetTitle }) => ({
      title: title || targetTitle,
    }),
  },
  fields: [
    {
      name: "target",
      type: "reference",
      title: "Target",
      to: [{ type: "page" }],
      description: "No target turns the item into a subheading",
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Overrides the title from the target if present",
    },
  ],
};
