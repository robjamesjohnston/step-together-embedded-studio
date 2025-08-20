export default {
  name: "homeArticleCards",
  type: "object",
  title: "Article cards",
  preview: {
    select: {
      title: "articles.0.title",
      subtitle: "articles.0.text",
    },
  },
  fields: [
    {
      name: "articles",
      type: "array",
      title: "Articles",
      of: [{ type: "articleCard" }],
    },
  ],
};
