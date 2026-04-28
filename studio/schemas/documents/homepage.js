export default {
  name: "homepage",
  type: "document",
  title: "Homepage",
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: "Homepage",
      };
    },
  },
  fields: [
    {
      name: "headerLogo",
      type: "image",
      title: "Header logo",
    },
    {
      name: "siteTitle",
      type: "string",
      title: "Site title",
    },
    {
      name: "siteDescription",
      type: "text",
      title: "Site description",
      rows: 3,
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "mainSlider" },
        { type: "clientGroups" },
        { type: "infoBox" },
        { type: "textBlock" },
        { type: "richTextBlock" },
        { type: "slider" },
        { type: "articleImage" },
        { type: "homeArticleCards" },
      ],
    },
  ],
};
