export default {
  name: "link",
  type: "object",
  title: "Link",
  description: "Choose a URL or Target",
  fields: [
    {
      name: "external",
      type: "url",
      title: "URL",
      description: "Link to an external page. Must start with 'https://'",
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: "internal",
      type: "reference",
      title: "Target",
      description: "Link to an internal page",
      to: [{ type: "page" }],
      hidden: ({ parent, value }) => !value && parent?.external,
    },
  ],
};
