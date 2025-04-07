"use client";
import { cn } from "@/lib/cn";
import { useJsEnabled } from "@/lib/use-js-enabled";
import type { ReactNode } from "react";

export function Body({ children }: { children: ReactNode }) {
	const jsEnabled = useJsEnabled();

	return (
		<body
			data-js_enabled={jsEnabled}
			className={cn(
				"dark:bg-gray-800 dark:text-white min-h-screen flex flex-col font-mono",
			)}
		>
			{children}
		</body>
	);
}
