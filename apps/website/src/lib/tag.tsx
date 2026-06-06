import Link from "next/link";

export function Tag({ tag }: { tag: string }) {
	return (
		<Link
			href={`/tags/${tag}`}
			className={
				"inline-block text-small text-fg-muted underline hover:text-fg transition-colors duration-75"
			}
		>
			#{tag}
		</Link>
	);
}
