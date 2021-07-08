export default {
  name: "nav",
  type: "document",
  title: "Navigation",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "handle",
      type: "string",
      title: "Handle",
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [{ type: "navSection" }],
    },
  ],
};
