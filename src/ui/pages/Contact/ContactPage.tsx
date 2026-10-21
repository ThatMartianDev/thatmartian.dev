"use client";

import { useState } from "react";
import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./ContactPage.module.css";

const email = "thatmartiandev@gmail.com";

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");

  async function copyEmail() {
    if (!navigator.clipboard) {
      setCopyStatus("error");
      return;
    }

    setCopyStatus("copying");

    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.divider} aria-hidden="true" />

      <section className={Styles.panel} aria-labelledby="contact-title" tabIndex={0}>
        <div className={Styles.panelContent}>
          <p className={Styles.sectionLabel}>
            Uplink <span aria-hidden="true">{"//"}</span> Contact
          </p>
          <h1 id="contact-title" className={Styles.title}>
            Let&apos;s build something useful.
          </h1>
          <p className={Styles.description}>
            Have a product to build, a workflow to improve, or an existing system
            that needs attention? Tell me what you&apos;re working on and where
            you need help.
          </p>

          <section className={Styles.work} aria-labelledby="work-title">
            <h2 id="work-title" className={Styles.smallLabel}>Let&apos;s talk about</h2>
            <ul className={Styles.workList}>
              <li>Product development & full-stack engineering</li>
              <li>AI integrations & workflow automation</li>
              <li>Freelance projects & engineering opportunities</li>
            </ul>
          </section>
        </div>
      </section>

      <section className={Styles.panel} aria-labelledby="email-title" tabIndex={0}>
        <div className={Styles.panelContent}>
          <h2 id="email-title" className={Styles.sectionLabel}>
            Direct channel <span aria-hidden="true">{"//"}</span> Email
          </h2>
          <a href={`mailto:${email}`} className={Styles.email}>{email}</a>
          <p className={Styles.description}>
            The simplest way to reach me. A short introduction is enough to get
            the conversation started.
          </p>
          <div className={Styles.actions}>
            <Button
              htmlType="link"
              url={`mailto:${email}`}
              text="Email me"
              className={Styles.action}
            />
            <Button
              text={copyStatus === "copying" ? "Copying..." : "Copy address"}
              onClick={copyEmail}
              disabled={copyStatus === "copying"}
              aria-describedby="copy-status"
              className={Styles.action}
            />
          </div>
          <p id="copy-status" role="status" className={Styles.copyStatus}>
            {copyStatus === "copied" && "Email address copied."}
            {copyStatus === "error" &&
              "Could not copy the address. Select the email above to copy it manually."}
          </p>

          <section className={Styles.messageGuide} aria-labelledby="message-title">
            <h2 id="message-title" className={Styles.smallLabel}>A useful first message</h2>
            <ul className={Styles.guideList}>
              <li>What you&apos;re building or the opportunity you have in mind.</li>
              <li>Where you need help, or what you&apos;d like me to take on.</li>
              <li>Your timeline and budget, if you already know them.</li>
            </ul>
            <p className={Styles.note}>No formal brief needed.</p>
          </section>

          <nav className={Styles.socials} aria-label="Social profiles">
            <Button
              htmlType="link"
              url="https://www.linkedin.com/in/ahmed-mohammed-tmd/"
              text="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.action}
            />
            <Button
              htmlType="link"
              url="https://github.com/ThatMartianDev"
              text="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.action}
            />
          </nav>
        </div>
      </section>
    </div>
  );
}
