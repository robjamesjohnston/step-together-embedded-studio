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
      name: "mainSlider",
      type: "array",
      title: "Main slider",
      of: [{ type: "sliderImage" }],
    },
    {
      name: "siteSummary",
      type: "text",
      title: "Site summary",
    },
    {
      name: "clientGroupButtons",
      type: "array",
      title: "Client groups",
      of: [{ type: "groupButton" }],
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [{ type: "infoBox" }, { type: "textBlock" }, { type: "slider" }],
    },
    {
      name: "articleCards",
      type: "array",
      title: "Articles",
      of: [{ type: "articleCard" }],
    },
  ],
};
