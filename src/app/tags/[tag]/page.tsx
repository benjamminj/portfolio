import { H } from "@/lib/h";
import { PostList } from "@/lib/post-list";
import { PostService } from "@/lib/posts-service.server";

export default async function TagRoute({
	params,
}: { params: { tag: string } }) {
	const posts = await PostService.list();
	const tag = await params.tag;
	const filtered = posts.filter((post) => post.tags.includes(tag));
	return (
		<>
			<H level={1} className="pb-line">
				posts tagged with "{tag}"
			</H>

			<PostList posts={filtered} />
		</>
	);
}

export async function generateStaticParams() {
	const posts = await PostService.list();
	const tags = posts.flatMap((post) => post.tags);
	const unique = new Set(tags);

	return Array.from(unique).map((tag) => ({ tag }));
}
