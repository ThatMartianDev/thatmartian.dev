import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/src/data/projects";
import ProjectPage from "@/src/ui/pages/Projects/ProjectPage/ProjectPage";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ project_slug: slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[project_slug]">): Promise<Metadata> {
  const { project_slug } = await params;
  const project = await getProjectBySlug(project_slug);

  if (!project) notFound();

  return {
    title: `${project.name} | ThatMartianDev`,
    description: project.description,
  };
}

export default async function ProjectRoute({
  params,
}: PageProps<"/projects/[project_slug]">) {
  const { project_slug } = await params;
  const project = await getProjectBySlug(project_slug);

  if (!project) notFound();

  const projects = getProjects();
  const index = projects.findIndex(({ slug }) => slug === project_slug);

  return (
    <ProjectPage
      project={project}
      position={index + 1}
      total={projects.length}
      previous={projects[index - 1]}
      next={projects[index + 1]}
    />
  );
}