import { IoDocumentOutline } from "react-icons/io5";

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        // { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        // { title: "H4", value: "h4" },
        // { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            icon: IoDocumentOutline,
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "page" }],
              },
            ],
          },
          {
            name: "link",
            type: "object",
            title: "External link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "articleImage",
    },
    {
      type: "quoteBox",
    },
    {
      type: "infoBox",
    },
    {
      type: "singleButton",
    },
    {
      name: "multipleButtons",
      type: "object",
      title: "Multiple buttons",
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
    },
    {
      name: "people",
      type: "object",
      title: "People",
      preview: {
        select: {
          title: "groupPeople.0.name",
          media: "groupPeople.0.image",
        },
      },
      fields: [
        {
          name: "groupPeople",
          type: "array",
          title: "People",
          of: [{ type: "reference", to: { type: "person" } }],
        },
      ],
    },
    {
      name: "docs",
      type: "object",
      title: "Documents",
      preview: {
        select: {
          title: "groupDocs.0.name",
        },
      },
      fields: [
        {
          name: "groupDocs",
          type: "array",
          title: "Documents",
          of: [{ type: "reference", to: { type: "doc" } }],
        },
      ],
    },
  ],
};
