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
      name: "twitterLink",
      type: "string",
      title: "Twitter",
    },
    {
      name: "linkedinLink",
      type: "string",
      title: "Linkedin",
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
