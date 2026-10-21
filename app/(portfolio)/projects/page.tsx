import type { Metadata } from "next";
import { getProjects } from "@/src/data/projects";
import AllProjects from "@/src/ui/pages/Projects/AllProjects/AllProjects";

export const metadata: Metadata = {
  title: "Projects | ThatMartianDev",
  description: "Selected application systems, AI workflows, and developer tools.",
};

export default function ProjectsPage() {
  return <AllProjects projects={getProjects()} />;
}
