"use client";
import type React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavLinkProps {
	href: string;
	title: string;
	isActive?: boolean;
	children: React.ReactNode;
}

export function NavLink({ href, title, children }: NavLinkProps) {
	const selected = useSelectedLayoutSegment();
	const isActive = `/${selected}` === href;

	return (
		<a
			href={href}
			title={title}
			className={clsx(
				"text-base underline",
				isActive
					? "text-black font-bold dark:text-white"
					: "text-gray-800 font-normal dark:text-gray-200",
			)}
		>
			{children}
		</a>
	);
}
