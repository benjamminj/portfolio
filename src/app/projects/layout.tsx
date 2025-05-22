import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BackgroundCodePattern } from "@/lib/background-code-pattern";

import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata = {
	title: "Projects | Benjamin Johnson",
	description: "",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={jetbrainsMono.variable}>
			<body className="font-mono bg-bg text-fg text-body min-h-screen">
				<BackgroundCodePattern />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
