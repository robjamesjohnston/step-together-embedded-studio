export default {
  name: "sliderImage",
  type: "object",
  title: "Slider image",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "altText",
      type: "string",
      title: "Alt text",
    },
    {
      name: "clientGroupCol",
      type: "string",
      title: "Client group",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Young people", value: "red" },
          { title: "Ex-offenders", value: "lightGreen" },
          { title: "WIS and veterans", value: "orange" },
        ],
      },
    },
    {
      name: "target",
      type: "reference",
      title: "Target",
      to: [{ type: "page" }],
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
