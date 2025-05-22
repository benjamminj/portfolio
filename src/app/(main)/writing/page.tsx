import { H } from "@/lib/h";
import { PostList } from "@/lib/post-list";
import { PostService } from "@/lib/posts-service.server";

export default async function WritingPage() {
	const posts = await PostService.list();

	return (
		<>
			<H level={1} className="pb-line">
				writing
			</H>

			<PostList posts={posts} />
		</>
	);
}
