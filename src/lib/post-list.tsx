import type { Post } from "@/lib/posts-service.server";
import Link from "next/link";

type PostListProps = {
	posts: Post[];
};

export async function PostList({ posts }: PostListProps) {
	return (
		<ul className="flex flex-col gap-line">
			{posts.map((post) => (
				<li key={post.slug}>
					<PostListItem post={post} />
				</li>
			))}
		</ul>
	);
}

export function PostListItem({ post }: { post: Post }) {
	const year = new Date(post.date).getFullYear();
	return (
		<div className="flex gap-3">
			<time className="text-fg-muted text-body">{year}</time>
			<Link
				href={`/${post.slug}`}
				data-testid="PostListItem__title"
				title={post.title}
				className="text-heading hover:underline"
			>
				{post.title}
			</Link>
		</div>
	);
}
