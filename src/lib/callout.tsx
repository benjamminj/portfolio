import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

export const CALLOUT_VARIANTS = [
	"NOTE",
	"TIP",
	"IMPORTANT",
	"WARNING",
	"CAUTION",
] as const;

type CalloutVariant = Lowercase<(typeof CALLOUT_VARIANTS)[number]>;

type CalloutProps = {
	variant: CalloutVariant;
	children: ReactNode;
	className?: string;
};

type CalloutVariantStyleConfig = {
	icon: string;
	colorGroupMapping: "success" | "warning" | "info" | "error" | "important";
};

const CALLOUT_VARIANT_STYLES: Record<
	CalloutVariant,
	CalloutVariantStyleConfig
> = {
	note: {
		icon: "💬",
		colorGroupMapping: "info",
	},
	tip: {
		icon: "💡",
		colorGroupMapping: "success",
	},
	important: {
		icon: "📣",
		colorGroupMapping: "important",
	},
	warning: {
		icon: "⚠️",
		colorGroupMapping: "warning",
	},
	caution: {
		icon: "🚨",
		colorGroupMapping: "error",
	},
};

export function Callout({ variant, children, className }: CalloutProps) {
	const config = CALLOUT_VARIANT_STYLES[variant];

	return (
		<blockquote
			style={
				{
					"--callout-bg": `var(--color-${config.colorGroupMapping}-bg)`,
					"--callout-bg-emphasis": `var(--color-${config.colorGroupMapping}-bg-emphasis)`,
					"--callout-border": `var(--color-${config.colorGroupMapping}-border)`,
					"--callout-fg-link": `var(--color-${config.colorGroupMapping}-fg-link)`,
					"--callout-fg-link-hover": `var(--color-${config.colorGroupMapping}-fg-link-hover)`,
					"--callout-fg-muted": `var(--color-${config.colorGroupMapping}-fg-muted)`,
				} as CSSProperties
			}
			className={cn(
				"bg-(--callout-bg)/50 backdrop-blur-[1px] text-fg outline-2 rounded-xs outline-(--callout-border)/50",
				"[&_a]:text-(--callout-fg-link) [&_a:hover]:text-(--callout-fg-link-hover)",
				"[&_code]:bg-(--callout-bg-emphasis)/10",
				"p-line [&_:last-child]:mb-0",
				className,
			)}
		>
			<div className="grid grid-cols-[auto_1fr] gap-3">
				<div aria-label={variant} className="not-italic font-serif">
					{config.icon}
				</div>
				<div>{children}</div>
			</div>
		</blockquote>
	);
}
