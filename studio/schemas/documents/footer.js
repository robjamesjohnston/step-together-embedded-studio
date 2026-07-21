import { IoDocumentOutline } from "react-icons/io5";

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
      name: "instagramLink",
      type: "string",
      title: "Instagram",
    },
    {
      name: "twitterLink",
      type: "string",
      title: "Twitter",
    },
    {
      name: "linkedInLink",
      type: "string",
      title: "LinkedIn",
    },
    {
      name: "youTubeLink",
      type: "string",
      title: "YouTube",
    },
    {
      name: "richCompanyInfo",
      type: "array",
      title: "Company information",
      of: [
        {
          title: "Block",
          type: "block",
          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [],
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
                    title: "Target",
                    description: "Link to a page or document",
                    to: [{ type: "page" }, { type: "doc" }],
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
                    type: "string",
                    title: "URL or email",
                    description: "Enter https://... URL or mailto:email@example.com",
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
      ],
    },
  ],
};
