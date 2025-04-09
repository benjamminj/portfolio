import Link, { type LinkProps } from "next/link";
import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export function A({
	href,
	children,
	...props
}: { href: string } & HTMLAttributes<HTMLAnchorElement>) {
	// TODO: semantic token for link color?
	const className = cn(
		"underline text-medium cursor-pointer text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400",
		props.className,
	);

	if (href === "") {
		return (
			<a {...props} className={className}>
				<b>{children}</b>
			</a>
		);
	}

	return (
		<Link href={href as LinkProps["href"]} {...props} className={className}>
			<b>{children}</b>
		</Link>
	);
}
