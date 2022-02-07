export default {
  name: "link",
  type: "object",
  title: "Link",
  description: "Choose a target or URL",
  fields: [
    {
      name: "internal",
      type: "reference",
      title: "Target",
      description: "Link to an internal page or document",
      to: [{ type: "page" }, { type: "doc" }],
      hidden: ({ parent, value }) => !value && parent?.external,
    },
    {
      name: "external",
      type: "url",
      title: "URL",
      description: "Link to an external page. Must start with 'https://'",
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
  ],
};
