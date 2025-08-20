export default {
  name: "mainSlider",
  type: "object",
  title: "Main slider",
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
