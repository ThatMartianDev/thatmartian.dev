import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./AboutPage.module.css";

const capabilities = [
    {
        title: "Product interfaces",
        technologies: "React, TypeScript, Next.js, UX engineering",
    },
    {
        title: "Application systems",
        technologies: "Node.js, Express, FastAPI, PostgreSQL",
    },
    {
        title: "AI & automation",
        technologies: "LLM integration, structured outputs, workflows",
    },
    {
        title: "Infrastructure",
        technologies: "AWS, Azure, Linux, Docker, deployment",
    },
];

export default function AboutPage() {
    return (
        <div className={Styles.container}>
            <div className={Styles.divider} aria-hidden="true">
                <span className={Styles.crosshair} />
                <span className={Styles.crosshair} />
            </div>

            <section className={Styles.panel} aria-labelledby="about-title" tabIndex={0}>
                <div className={Styles.panelContent}>
                    <p className={Styles.sectionLabel}>
                        Ahmed Mohammed <span aria-hidden="true">{"//"}</span> Full-Stack Product Engineer
                    </p>
                    <h1 id="about-title" className={Styles.title}>
                        I design, build, and ship software products.
                    </h1>
                    <p className={Styles.description}>
                        I&apos;m Ahmed, a Full-Stack Product Engineer who works across product
                        design, application development, AI integrations, and cloud
                        infrastructure. I turn ideas into working software, from the first
                        interface to the production deployment.
                    </p>

                    <div className={Styles.actions}>
                        <Button htmlType="link" url="/projects" text="Explore systems" className={Styles.action} />
                        <Button
                            htmlType="link"
                            url="https://github.com/ThatMartianDev"
                            text="GitHub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={Styles.action}
                        />
                        <Button
                            htmlType="link"
                            text="LinkedIn"
                            url="https://www.linkedin.com/in/ahmed-mohammed-tmd/"
                            title="LinkedIn profile link coming soon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={Styles.action}
                        />
                    </div>
                </div>
            </section>

            <section className={`${Styles.panel} ${Styles.capabilities}`} aria-labelledby="capabilities-title" tabIndex={0}>
                <div className={Styles.panelContent}>
                    <h2 id="capabilities-title" className={Styles.sectionLabel}>
                        SYS_SPEC <span aria-hidden="true">{"//"}</span> Capabilities
                    </h2>
                    <ol className={Styles.capabilityList}>
                        {capabilities.map(({ title, technologies }, index) => (
                            <li key={title}>
                                <h3 className={Styles.capabilityTitle}>
                                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")} {"//"}</span> {title}
                                </h3>
                                <p className={Styles.technologies}>{technologies}</p>
                            </li>
                        ))}
                    </ol>

                    <div className={Styles.stackAction}>
                        <Button htmlType="link" url="/architecture" text="Detailed stack" className={Styles.action} />
                    </div>
                </div>
            </section>
        </div>
    );
}