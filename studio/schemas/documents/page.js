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
