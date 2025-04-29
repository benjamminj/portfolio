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
		"underline text-body font-bold cursor-pointer text-fg-link hover:text-fg-link-hover",
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
				{children}
			</Link>
		</span>
	);
}
