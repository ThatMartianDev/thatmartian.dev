import type { ReactNode } from "react";
import Shell from "@/src/ui/components/layout/Shell/Shell";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
	return <Shell>{children}</Shell>;
}
