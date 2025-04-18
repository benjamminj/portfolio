import { JetBrains_Mono } from "next/font/google";
import { useId, type ReactNode } from "react";

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
	const id = "test";

	return (
		<html lang="en" className={jetbrainsMono.variable}>
			<body className="font-mono bg-bg text-fg text-body min-h-screen relative">
				{/* <svg viewBox="0 0 400 300">
					<title>bg</title> */}

				{/* <rect className="h-10 rounded-full fill-current" /> */}
				{/* <foreignObject
						fill="#000"
						x="0"
						y="0"
						width="100%"
						height="100%"
						id={id}
					>
						<div
						// className="size-10 rounded-full fill-black"
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
							inventore incidunt? Officiis laboriosam molestiae soluta a
							recusandae quo voluptate quos libero voluptatum dicta
							reprehenderit iste perspiciatis, nemo iure tempora? Sit?
						</div>
					</foreignObject>
				</svg> */}

				{/* <svg width="0" height="0" viewBox="0 0 400 300">
					<defs>
						<mask id="mask">
							<rect fill="#000000" x="0" y="0" width="400" height="300"></rect>
							<circle fill="#FFFFFF" cx="150" cy="150" r="100" />
							<circle fill="#FFFFFF" cx="50" cy="50" r="150" />
						</mask>
					</defs>
				</svg> */}
				<div
					style={
						{
							// "--mask": "url(/static/favicon.svg)"
							"--mask": `url('/bg-pattern-code.svg')`,
						} as React.CSSProperties
					}
					className="absolute inset-0 size-full overflow-hidden bg-(image:--mask)  -z-10"
				/>
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
