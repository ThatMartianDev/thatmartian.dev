import Link from "next/link";
import type { Project, ProjectSummary } from "@/src/data/projectTypes";
import Button from "@/src/ui/components/micro/Button/Button";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Styles from "./ProjectPage.module.css";

type ProjectPageProps = {
  project: Project;
  position: number;
  total: number;
  previous?: ProjectSummary;
  next?: ProjectSummary;
};

export default function ProjectPage({
  project,
  position,
  total,
  previous,
  next,
}: ProjectPageProps) {
  const { overview } = project;

  return (
    <div className={Styles.container}>
      <div className={Styles.divider} aria-hidden="true" />

      <aside
        className={Styles.sidebar}
        aria-label="Project summary"
        tabIndex={0}
      >
        <p className={Styles.breadcrumb}>
          <Link href="/projects">Deployed systems</Link>
          <span aria-hidden="true">{"//"}</span>
          <span>{project.name}</span>
        </p>

        <ProjectGallery
          key={project.slug}
          projectName={project.name}
          thumbnail={project.thumbnail}
          images={project.gallery}
        />
        <div className={Styles.projectHeader}>
          <h1 className={Styles.projectName}>{project.name}</h1>
          <p className={Styles.headline}>{project.headline}</p>
        </div>

        <dl className={Styles.metadata}>
          <div>
            <dt>Type:</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Role:</dt>
            <dd>{project.role}</dd>
          </div>
          {project.url && (
            <div>
              <dt>URL:</dt>
              <dd >
                <Button
                  htmlType="link"
                  url={project.url.href}
                  text={project.url.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.action}
                />
              </dd>
            </div>
          )}
        </dl>

        <nav
          className={Styles.projectNavigation}
          aria-label="Project navigation"
        >
          {previous ? (
            <Button
              htmlType="link"
              url={`/projects/${previous.slug}`}
              text="Prev"
              aria-label={`Previous project: ${previous.name}`}
              className={Styles.action}
            />
          ) : (
            <Button text="Prev" disabled className={Styles.action} />
          )}
          <span
            className={Styles.position}
            aria-label={`Project ${position} of ${total}`}
          >
            {String(position).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {next ? (
            <Button
              htmlType="link"
              url={`/projects/${next.slug}`}
              text="Next"
              aria-label={`Next project: ${next.name}`}
              className={Styles.action}
            />
          ) : (
            <Button text="Next" disabled className={Styles.action} />
          )}
        </nav>
      </aside>

      <section className={Styles.content} aria-label="Project details">
        <nav className={Styles.tabs} aria-label="Project sections">
          <Button
            htmlType="link"
            url="#overview"
            text="Overview"
            aria-current="location"
            className={`${Styles.action} ${Styles.currentTab}`}
          />
          <Button
            text="Case study"
            disabled
            title="Case study coming soon"
            className={Styles.action}
          />
          <Button
            text="Architecture"
            disabled
            title="Architecture coming soon"
            className={Styles.action}
          />
        </nav>

        <article
          id="overview"
          className={Styles.overview}
          aria-label={`${project.name} overview`}
          tabIndex={0}
        >
          <section
            className={Styles.section}
            aria-labelledby="introduction-title"
          >
            <h2 id="introduction-title">{overview.introduction.title}</h2>
            {overview.introduction.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className={Styles.section} aria-labelledby="solution-title">
            <h2 id="solution-title">{overview.solution.title}</h2>
            {overview.solution.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section
            className={Styles.section}
            aria-labelledby="capabilities-title"
          >
            <h2 id="capabilities-title">Key capabilities</h2>
            <ul className={Styles.capabilities}>
              {overview.capabilities.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={Styles.section}
            aria-labelledby="technologies-title"
          >
            <h2 id="technologies-title">Core technologies</h2>
            <p className={Styles.technologies}>{project.stack.join(", ")}.</p>
          </section>
        </article>
      </section>
    </div>
  );
}
