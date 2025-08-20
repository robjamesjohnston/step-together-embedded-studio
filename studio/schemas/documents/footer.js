export default {
  name: "footer",
  type: "document",
  title: "Footer",
  preview: {
    select: {
      title: "selection.title",
    },
    prepare(selection) {
      return {
        title: "Footer",
      };
    },
  },
  fields: [
    {
      name: "facebookLink",
      type: "string",
      title: "Facebook",
    },
    {
      name: "instagramLink",
      type: "string",
      title: "Instagram",
    },
    {
      name: "twitterLink",
      type: "string",
      title: "Twitter",
    },
    {
      name: "linkedInLink",
      type: "string",
      title: "LinkedIn",
    },
    {
      name: "youTubeLink",
      type: "string",
      title: "YouTube",
    },
    {
      name: "companyInfo",
      type: "text",
      title: "Company information",
    },
  ],
};
