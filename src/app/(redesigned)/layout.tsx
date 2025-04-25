import { JetBrains_Mono } from "next/font/google";
import { useId, type ReactNode } from "react";

import "../globals.css";
import { chunk } from "lodash";
import { BackgroundCodePattern } from "./_components/background-code-pattern";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata = {
	title: "Benjamin Johnson",
	description: "",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={jetbrainsMono.variable}>
			<body className="font-mono bg-bg text-fg text-body min-h-screen relative">
				<BackgroundCodePattern />
				<div className="p-5">
					<header>
						<h1 className="text-heading">benjamin johnson</h1>
					</header>

					<main className="pt-15">{children}</main>
				</div>
			</body>
		</html>
	);
}
