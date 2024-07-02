export default {
  name: "clientGroupHighlightCol",
  type: "string",
  title: "Client group or highlight colour",
  description: "Choose a client group if appropriate or choose a highlight colour",
  options: {
    list: [
      { title: "Young people", value: "red" },
      { title: "Ex-offenders", value: "lightGreen" },
      { title: "WIS and veterans", value: "orange" },
      { title: "Green", value: "green" },
      { title: "Lime", value: "lime" },
      { title: "Dark grey", value: "darkGrey" },
    ],
  },
};
