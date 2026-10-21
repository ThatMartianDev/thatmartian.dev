import type { Metadata } from "next";
import ArchitecturePage from "@/src/ui/pages/Architecture/ArchitecturePage";

export const metadata: Metadata = {
  title: "Architecture & Skills | ThatMartianDev",
  description:
    "Ahmed Mohammed's skills across product design, frontend, backend, AI workflows, and cloud delivery, plus a current focus on learning cybersecurity.",
};

export default function Page() {
  return <ArchitecturePage />;
}
