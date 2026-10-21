import { createPageMetadata } from "@/src/helpers/metadata";
import { getProjects } from "@/src/data/projects";
import AllProjects from "@/src/ui/pages/Projects/AllProjects/AllProjects";
import { Metadata } from "next";

export const metadata:Metadata = createPageMetadata(
  "Projects | ThatMartianDev",
  "Explore Ahmed Mohammed's selected work: AI-powered applications, configurable CRM systems, multi-model AI workspaces, and cloud deployment tools.",
  "/projects",
);

export default function ProjectsPage() {
  return <AllProjects projects={getProjects()} />;
}
