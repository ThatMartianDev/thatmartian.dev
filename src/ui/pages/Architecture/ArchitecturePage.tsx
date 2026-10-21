import Link from "next/link";
import { skillGroups } from "@/src/data/skills";
import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./ArchitecturePage.module.css";

export default function ArchitecturePage() {
  return (
    <div className={Styles.container}>
      <div className={Styles.divider} aria-hidden="true" />

      <aside className={Styles.sidebar} aria-labelledby="architecture-title" tabIndex={0}>
        <div className={Styles.introduction}>
          <p className={Styles.sectionLabel}>
            SYS_SPEC <span aria-hidden="true">{"//"}</span> Architecture & skills
          </p>
          <h1 id="architecture-title" className={Styles.title}>
            From product intent to production.
          </h1>
          <p className={Styles.description}>
            I work across product design, application development, AI workflows,
            and cloud infrastructure. These are the skills and tools I bring to
            building and shipping software.
          </p>
        </div>

        <nav className={Styles.index} aria-label="Skill areas">
          <ol>
            {skillGroups.map(({ id, title }, index) => (
              <li key={id}>
                <Link href={`#${id}`}>
                  <span className={Styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")} {"//"}
                  </span>
                  {title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <section className={Styles.learning} aria-labelledby="learning-title">
          <p className={Styles.learningLabel}>Currently learning</p>
          <h2 id="learning-title">Cybersecurity</h2>
          <p className={Styles.description}>
            I&apos;m currently learning cybersecurity, building on my experience
            developing and deploying web applications.
          </p>
        </section>

        <div className={Styles.projectAction}>
          <Button
            htmlType="link"
            url="/projects"
            text="Explore systems"
            className={Styles.action}
          />
        </div>
      </aside>

      <section className={Styles.skills} aria-labelledby="skills-title" tabIndex={0}>
        <div className={Styles.skillsInner}>
          <header className={Styles.skillsHeader}>
            <h2 id="skills-title" className={Styles.sectionLabel}>
              Toolkit <span aria-hidden="true">{"//"}</span> Applied skills
            </h2>
          </header>

          {skillGroups.map(({ id, title, description, tools }, index) => (
            <section key={id} id={id} className={Styles.skillGroup} aria-labelledby={`${id}-title`}>
              <div className={Styles.groupHeading}>
                <span className={Styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 id={`${id}-title`}>{title}</h3>
              </div>
              <p className={Styles.description}>{description}</p>
              <ul className={Styles.tools} aria-label={`${title} skills and tools`}>
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
