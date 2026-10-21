import Button from "@/src/ui/components/micro/Button/Button";

export default function ProjectNotFound() {
  return (
    <section style={{ padding: "var(--content-padding)" }}>
      <h1>Project not found</h1>
      <p>This project does not exist or has not been published.</p>
      <Button htmlType="link" url="/projects" text="All projects" />
    </section>
  );
}
