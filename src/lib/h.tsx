import type { ComponentPropsWithoutRef, JSX, ReactNode } from "react";
import { cn } from "./cn";

type HLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HProps = {
	level?: HLevel;
	children: ReactNode;
	/**
	 * - `prefixed` will add a `#` prefix to the heading based on its level.
	 * - `bare` will not add a prefix, just the `h` tag & default typographic styles.
	 */
	variant?: "prefixed" | "bare";
};

/**
 * A generalized heading component that can be used to render h1-h6 tags. This helps
 * keep the typographic styles consistent for the prose headings.
 *
 * @todo:
 * - Add support for an automatic `level` based on whether the heading is nested
 *   inside of a `section` / `article` tag.
 */
export function H({
	level: controlledLevel = 2,
	children,
	variant = "prefixed",
	className,
	...props
}: HProps & ComponentPropsWithoutRef<"h1">) {
	const level = Math.min(Math.max(controlledLevel, 1), 6);

	const Tag = `h${level}` as `h${HLevel}`;

	return (
		<Tag
			data-content={variant === "prefixed" ? "#".repeat(level) : undefined}
			className={cn(
				"text-heading before:text-fg-muted",
				variant === "prefixed" &&
					"before:content-[attr(data-content)] before:mr-[1ch] before:no-underline before:inline-block",
				className,
			)}
			{...props}
		>
			{children}
		</Tag>
	);
}
