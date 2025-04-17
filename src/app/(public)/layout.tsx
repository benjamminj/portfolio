import { Body } from "./_components/body";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { JetBrains_Mono } from "next/font/google";

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

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" className={jetbrainsMono.variable}>
			<Body>
				<div className="relative">
					<div className="absolute inset-x-0 top-0">
						<Header />
					</div>
				</div>

				<main>{children}</main>

				<Footer />
			</Body>
		</html>
	);
}
