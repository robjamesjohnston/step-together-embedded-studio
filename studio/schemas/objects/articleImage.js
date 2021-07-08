export default {
  name: "articleImage",
  type: "object",
  title: "Image",
  preview: {
    select: {
      title: "alignment",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: `${
          title === "left" || title === "right"
            ? "Aligned " + title
            : title === "full"
            ? "Full width"
            : title === "small"
            ? "Small"
            : ""
        }`,
        media: media,
      };
    },
  },
  fields: [
    {
      name: "altText",
      type: "string",
      title: "Alt text",
    },
    {
      name: "alignment",
      type: "string",
      title: "Alignment",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
          { title: "Full width", value: "full" },
          { title: "Small", value: "small" },
        ],
      },
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
