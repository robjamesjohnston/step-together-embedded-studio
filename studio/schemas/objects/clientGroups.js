export default {
  name: "clientGroups",
  type: "object",
  title: "Client groups",
  preview: {
    select: {
      title: "groupButtons.0.title",
      subtitle: "groupButtons.0.text",
    },
  },
  fields: [
    {
      name: "groupButtons",
      type: "array",
      title: "Buttons",
      of: [{ type: "groupButton" }],
    },
  ],
};
