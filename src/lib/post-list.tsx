import type { Post } from "@/lib/posts-service.server";
import Link from "next/link";
import { Tag } from "./tag";

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

			<div className="leading-0">
				<Link
					href={`/${post.slug}`}
					data-testid="PostListItem__title"
					title={post.title}
					className="text-heading hover:underline"
				>
					{post.title}
				</Link>

				{post.tags && post.tags.length > 0 && (
					<ul className="flex gap-ch">
						{post.tags.map((tag) => (
							<li key={tag}>
								<Tag key={tag} tag={tag} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
