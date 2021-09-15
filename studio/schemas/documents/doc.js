export default {
  name: "doc",
  type: "document",
  title: "Documents",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "file",
      type: "file",
      title: "File",
    },
  ],
};
