import Link from "next/link";
import { cn } from "./cn";

type TagVariant = "strong" | "default";

export function Tag({
	variant = "default",
	tag,
}: { variant?: TagVariant; tag: string }) {
	const tagColorMap: Record<TagVariant, string> = {
		default:
			"text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-900",
		strong:
			"text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-50 dark:hover:bg-gray-900",
	};

	return (
		<Link
			href={`/tags/${tag}`}
			className={cn(
				"inline-block p-1 -m-1 font-mono text-xs no-underline hover:underline",
				tagColorMap[variant],
			)}
		>
			#{tag}
		</Link>
	);
}
