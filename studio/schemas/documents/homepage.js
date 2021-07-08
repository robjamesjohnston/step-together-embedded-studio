export default {
  name: "homepage",
  type: "document",
  title: "Homepage",
  preview: {
    select: {
      title: "selection.title",
    },
    prepare(selection) {
      return {
        title: "Step Together",
      };
    },
  },
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  __experimental_actions: [/*"create",*/ "update", /*"delete",*/ "publish"],
  fields: [
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
  ],
};
