import { JetBrains_Mono } from "next/font/google";
import { useId, type ReactNode } from "react";

import "../globals.css";
import { chunk } from "lodash";
import { BackgroundCodePattern } from "./_components/background-code-pattern";
import Link from "next/link";

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
				<div className="p-line">
					<header>
						<Link href="/" className="hover:underline lowercase text-heading">
							Benjamin Johnson
						</Link>
					</header>

					<main className="pt-line-3">{children}</main>
				</div>
			</body>
		</html>
	);
}
