import { PageWrapper } from "@/app/(public)/_components/page-wrapper";
import { PostList } from "@/lib/post-list";
import { PostService } from "@/lib/posts-service.server";

export default async function TagRoute({
	params,
}: { params: { tag: string } }) {
	const posts = await PostService.list();
	const filtered = posts.filter((post) => post.tags.includes(params.tag));
	return (
		<PageWrapper
			title={`#${params.tag}`}
			subtitle={`${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`}
		>
			<PostList posts={filtered} />
		</PageWrapper>
	);
}

export async function generateStaticParams() {
	const posts = await PostService.list();
	const tags = posts.flatMap((post) => post.tags);
	const unique = new Set(tags);

	return Array.from(unique).map((tag) => ({ tag }));
}
