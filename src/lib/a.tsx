import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { cn } from "./cn";

export function A({
	href,
	children,
	...props
}: { href: string } & ComponentPropsWithoutRef<"a">) {
	// TODO: semantic token for link color?
	const className = cn(
		"underline text-body cursor-pointer text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400",
		props.className,
	);

	if (href === "") {
		return (
			<span>
				<a {...props} className={className}>
					<b>{children}</b>
				</a>
			</span>
		);
	}

	return (
		<span>
			<Link href={href as LinkProps["href"]} {...props} className={className}>
				<b>{children}</b>
			</Link>
		</span>
	);
}
