"use client";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
	href: string;
	children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
	const segment = useSelectedLayoutSegment();

	const active = href === `/design-system/${segment}`;

	return (
		<Link
			href={href}
			className={cn("underline leading-none", active && "text-@h5")}
		>
			{children}
		</Link>
	);
}
