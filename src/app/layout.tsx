import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { BackgroundCodePattern } from "@/lib/background-code-pattern";
import Link from "next/link";
import "./globals.css";

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
				<div className="p-line xl:p-line-2 2xl:p-line-3">
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
