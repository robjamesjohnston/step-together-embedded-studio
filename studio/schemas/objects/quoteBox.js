export default {
  name: "quoteBox",
  type: "object",
  title: "Quote",
  preview: {
    select: {
      title: "quote",
      subtitle: "author",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `${title ? title.substring(0, 50) + "..." : "Quote"}`,
        subtitle: `${subtitle ? subtitle : "Author"}`,
      };
    },
  },
  fields: [
    {
      name: "quote",
      type: "text",
      title: "Quote",
    },
    {
      name: "author",
      type: "string",
      title: "Author",
    },
  ],
};
