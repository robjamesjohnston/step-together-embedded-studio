import { defineConfig } from "sanity";
import { dashboardTool, projectUsersWidget } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import defaultDocumentNode from "./studio/defaultDocumentNode";
import deskStructure from "./studio/deskStructure";
import schemas from "./studio/schemas/schema";

export default defineConfig({
  basePath: "/studio",
  title: "Step Together",
  projectId: "1soudqhb",
  dataset: "production",
  plugins: [
    dashboardTool({
      widgets: [
        documentListWidget({
          layout: { width: "large" },
          title: "Recent pages",
          showCreateButton: true,
          limit: 5,
          types: ["page"],
        }),
        projectUsersWidget({
          layout: { width: "small" },
        }),
      ],
    }),
    deskTool({
      defaultDocumentNode: defaultDocumentNode,
      structure: deskStructure,
    }),
    visionTool(),
  ],
  // tools: (prev) => {
  //   // Uses environment variables set by Vite in development mode
  //   if (import.meta.env.DEV) {
  //     return prev;
  //   }
  //   return prev.filter((tool) => tool.name !== "vision");
  // },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => templateItem.templateId != "homepage" && templateItem.templateId != "footer"
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "homepage" || schemaType === "footer") {
        return prev.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action));
      }
      return prev;
    },
  },
});
