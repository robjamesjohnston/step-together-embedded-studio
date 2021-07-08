export default {
  name: "slider",
  type: "object",
  title: "Image slider",
  preview: {
    select: {
      title: "sliderImages.0.title",
      media: "sliderImages.0.image",
    },
  },
  fields: [
    {
      name: "handle",
      type: "string",
      title: "Handle",
    },
    {
      name: "sliderImages",
      type: "array",
      title: "Slider images",
      of: [{ type: "sliderImage" }],
    },
  ],
};
