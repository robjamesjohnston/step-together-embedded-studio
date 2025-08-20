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
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "mainSlider" },
        { type: "clientGroups" },
        { type: "infoBox" },
        { type: "textBlock" },
        { type: "slider" },
        { type: "homeArticleCards" },
      ],
    },
  ],
};
