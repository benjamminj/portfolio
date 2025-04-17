import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "../globals.css";

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
			<body className="font-mono p-5 bg-bg text-fg">
				<header>
					<h1 className="text-heading">benjamin johnson</h1>
				</header>

				<main className="pt-15">{children}</main>
			</body>
		</html>
	);
}
