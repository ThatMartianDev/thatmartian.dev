"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./AllProjects.module.css";
import type { ProjectSummary } from "@/src/data/projectTypes";

type AllProjectsProps = {
  projects: readonly ProjectSummary[];
};

export default function AllProjects({ projects }: AllProjectsProps) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug);
  const selectedIndex = projects.findIndex((project) => project.slug === selectedSlug);
  const selectedProject = projects[selectedIndex];

  return (
    <div className={Styles.container}>
      <div className={Styles.divider} aria-hidden="true">
        <span className={Styles.crosshair} />
        <span className={Styles.crosshair} />
      </div>

      <section className={Styles.directory} aria-labelledby="projects-title">
        <div className={Styles.sectionHeader}>
          <h1 id="projects-title" className={Styles.sectionLabel}>
            Deployed systems <span aria-hidden="true">{"//"}</span> Selected work
          </h1>
          <span className={Styles.count}>{String(projects.length).padStart(2, "0")}</span>
        </div>

        <ol className={Styles.projectList} tabIndex={0} aria-label="Projects">
          {projects.map((project) => {
            const selected = project.slug === selectedSlug;

            return (
              <li key={project.slug}>
                <button
                  type="button"
                  className={`${Styles.projectRow} ${selected ? Styles.selected : ""}`}
                  aria-pressed={selected}
                  aria-controls="project-preview"
                  onClick={() => setSelectedSlug(project.slug)}
                >
                  <span className={Styles.thumbnail}>
                    <Image
                      src={project.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 40rem) 112px, 176px"
                      className={Styles.thumbnailImage}
                    />
                  </span>
                  <span className={Styles.projectText}>
                    <span className={Styles.projectName}>{project.name}</span>
                    <span className={Styles.projectDescription}>{project.description}</span>
                  </span>
                  <span className={Styles.projectRole}>{project.role}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <ol className={Styles.projectCards} aria-label="Projects">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className={Styles.projectCard}
                aria-labelledby={`project-card-${project.slug}`}
              >
                <span className={Styles.cardThumbnail}>
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 40rem) calc(100vw - 6rem), (max-width: 64rem) calc(50vw - 5rem), 1px"
                    className={Styles.thumbnailImage}
                  />
                </span>
                <div className={Styles.cardBody}>
                  <p className={Styles.eyebrow}>{project.category}</p>
                  <h2 id={`project-card-${project.slug}`} className={Styles.projectName}>
                    {project.name}
                  </h2>
                  <p className={Styles.projectDescription}>{project.description}</p>
                  <p className={Styles.cardRole}>{project.role}</p>
                  <span className={Styles.cardAction} aria-hidden="true">
                    [ View project ]
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="project-preview"
        className={Styles.preview}
        aria-labelledby="preview-title"
        tabIndex={0}
      >
        <h2 id="preview-title" className={Styles.sectionLabel}>
          <span className={Styles.previewIndicator} aria-hidden="true" />
          System overview
        </h2>

        {selectedProject ? (
          <>
            <p className={Styles.announcement} role="status">
              Selected project: {selectedProject.name}
            </p>

            <div className={Styles.identity}>
              <p className={Styles.eyebrow}>
                SYS_{String(selectedIndex + 1).padStart(2, "0")} / {selectedProject.category}
              </p>
              <h3 className={Styles.previewName}>{selectedProject.name}</h3>
              <p className={Styles.headline}>{selectedProject.headline}</p>
            </div>

            <p className={Styles.summary}>{selectedProject.summary}</p>

            <dl className={Styles.metadata}>
              <div>
                <dt>Role</dt>
                <dd>{selectedProject.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{selectedProject.stack.join(" / ")}</dd>
              </div>
            </dl>

            <div className={Styles.previewActions}>
              <Button
                htmlType="link"
                url={`/projects/${selectedProject.slug}`}
                text="View project"
                className={Styles.viewProject}
              />
              {selectedProject.url && (
                <Button
                  htmlType="link"
                  url={selectedProject.url.href}
                  text={selectedProject.url.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.viewProject}
                />
              )}
            </div>
          </>
        ) : (
          <p className={Styles.summary}>Project overviews will appear here when published.</p>
        )}
      </section>
    </div>
  );
}
