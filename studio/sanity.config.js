import { defineConfig } from "sanity";
import { dashboardTool, projectUsersWidget } from "@sanity/dashboard";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";
import Iframe from "sanity-plugin-iframe-pane";

function getPreviewUrl(doc) {
  return doc?.slug?.current ? `https://www.step-together.org.uk/${doc.slug.current}` : window.location.host;
}

const defaultDocumentNode = (S, { schemaType }) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case "page":
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc) => getPreviewUrl(doc),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};

export default defineConfig({
  title: "Step Together",
  projectId: "1soudqhb",
  dataset: "production",
  plugins: [
    dashboardTool({
      widgets: [
        vercelWidget(),
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
      defaultDocumentNode,
      structure: deskStructure,
    }),
    visionTool(),
  ],
  tools: (prev) => {
    // Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev;
    }
    return prev.filter((tool) => tool.name !== "vision");
  },
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
