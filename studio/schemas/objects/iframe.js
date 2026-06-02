export default {
  name: "iframe",
  type: "object",
  title: "HTML iframe",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "url",
      type: "string",
      title: "URL",
      description: "Must start with 'https://'",
    },
    {
      name: "height",
      type: "string",
      title: "Height",
      description: "Please don't include units",
    },
  ],
};
