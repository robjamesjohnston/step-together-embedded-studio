export default {
  name: "page",
  title: "Pages",
  type: "document",
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
      description: "SEO title for search engines (Recommended 50-60 characters. Optional - defaults to page title if not provided)",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description: "SEO description for search engines (Recommended 150-160 characters)",
      rows: 3,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Please generate a slug or choose your own. 'https://step-together.org.uk/slug-goes-here'",
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (typeof slug === "undefined") return true;
          const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
          if (regex.test(slug.current)) {
            return true;
          } else {
            return "Invalid. Only lowercase letters, numbers and dashes allowed"; // Error message goes here
          }
        }),
      options: {
        source: "title",
      },
    },
    {
      name: "clientGroupHighlightCol",
      type: "clientGroupHighlightCol",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
