import "server-only";
import summaries from "./projects.json";
import type { Project, ProjectContent, ProjectSummary } from "./projectTypes";

const contentLoaders: Readonly<Record<string, () => Promise<{ default: ProjectContent }>>> = {
  "vminds-meals": () => import("./projects/vminds-meals.json"),
  "modular-ai-crm": () => import("./projects/modular-ai-crm.json"),
  "vminds-solo": () => import("./projects/vminds-solo.json"),
  "awsd-deploy-cli": () => import("./projects/awsd-deploy-cli.json"),
};

export function getProjects(): readonly ProjectSummary[] {
  return summaries;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const summary = getProjects().find((project) => project.slug === slug);

  if (!summary) {
    return undefined;
  }

  const loadContent = Object.hasOwn(contentLoaders, slug) ? contentLoaders[slug] : undefined;

  if (!loadContent) {
    throw new Error(`Missing content loader for project "${slug}".`);
  }

  const { default: content } = await loadContent();
  return { ...summary, ...content };
}
