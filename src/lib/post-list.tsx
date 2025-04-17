import type { Post } from "@/lib/posts-service.server";
import Link from "next/link";
import { Tag } from "./tag";

type PostListProps = {
	posts: Post[];
};

export async function PostList({ posts }: PostListProps) {
	return (
		<ul className="space-y-2">
			{posts.map((post) => (
				<li key={post.slug} className="w-full">
					<PostListItem post={post} />
				</li>
			))}
		</ul>
	);
}

export function PostListItem({ post }: { post: Post }) {
	return (
		<div className="relative p-4 -mx-4 hover:bg-gray-100 dark:hover:bg-gray-900/50">
			<div className="space-y-1 md:flex md:space-y-0 md:space-x-4">
				<time className="text-gray-500 dark:text-gray-400 flex items-end shrink-0 font-mono text-small md:h-8 md:pt-1 md:pb-1.5 tabular-nums leading-none">
					{post.date}
				</time>

				<div>
					{/* TODO: dynamic `h` tag */}
					<h2 className="text-2xl">
						<Link
							href={`/${post.slug}`}
							data-testid="PostListItem__title"
							title={post.title}
							className="font-semibold text-gray-800 no-underline hover:text-gray-800 dark:text-gray-200 dark:hover:text-white hover:underline before:empty-content before:absolute before:inset-0"
						>
							{post.title}
						</Link>
					</h2>

					{post.tags?.length > 0 && (
						<ul className="relative z-10 flex flex-wrap -ml-2">
							{post.tags.map((tag) => (
								<li key={tag} className="ml-2">
									<Tag tag={tag} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
