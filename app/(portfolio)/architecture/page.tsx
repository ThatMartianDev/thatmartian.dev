import { createPageMetadata } from "@/src/helpers/metadata";
import ArchitecturePage from "@/src/ui/pages/Architecture/ArchitecturePage";
import { Metadata } from "next";

export const metadata:Metadata = createPageMetadata(
  "Architecture & Skills | ThatMartianDev",
  "Ahmed Mohammed's skills across product design, frontend, backend, AI workflows, and cloud delivery, plus a current focus on learning cybersecurity.",
  "/architecture",
);

export default function Page() {
  return <ArchitecturePage />;
}
