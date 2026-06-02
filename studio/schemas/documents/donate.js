export default {
  name: "donate",
  type: "document",
  title: "Donate",
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: "Donate",
      };
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Please enter a page title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "SEO title for search engines. Recommended 50-60 characters. Optional - defaults to page title if not provided",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "SEO description for search engines. Recommended 150-160 characters",
      rows: 3,
    },
    {
      name: "richTextBlock",
      type: "richTextBlock",
      title: "Rich text block",
    },
  ],
};
