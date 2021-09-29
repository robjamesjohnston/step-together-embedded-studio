export default {
  widgets: [
    {
      name: "vercel",
      layout: {
        width: "full", // full width is recommended!
      },
    },
    {
      name: "project-info",
    },
    {
      name: "project-users",
    },
    {
      name: "document-list",
      options: {
        title: "Recent pages",
        query: '*[_type == "page"] | order(_updatedAt desc)',
      },
    },
  ],
};
