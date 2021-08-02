export default {
  name: "person",
  title: "People",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "job",
      title: "Job",
      type: "string",
    },
    {
      name: "area",
      title: "Area",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
  ],
};
