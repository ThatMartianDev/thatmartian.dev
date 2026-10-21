import type { ReactNode } from "react";
import Header from "@/src/ui/components/layout/Header/Header";
import Footer from "@/src/ui/components/layout/Footer/Footer";
import Styles from "./Shell.module.css";

type ShellProps = {
	children: ReactNode;
};

export default function Shell({ children }: ShellProps) {
	return (
		<div className={Styles.shell}>
			<a href="#main-content" className={Styles.skipLink}>
				Skip to content
			</a>
			<Header />
			<main className={Styles.content}>
				<div className={Styles.frame} aria-hidden="true">
					<span className={`${Styles.crosshair} ${Styles.topLeft}`} />
					<span className={`${Styles.crosshair} ${Styles.topRight}`} />
					<span className={`${Styles.crosshair} ${Styles.bottomLeft}`} />
					<span className={`${Styles.crosshair} ${Styles.bottomRight}`} />
				</div>
				<div id="main-content" className={Styles.contentInner} tabIndex={-1}>
					{children}
				</div>
			</main>
			<Footer />
		</div>
	);
}
