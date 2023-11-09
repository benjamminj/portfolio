import { PostList } from '@/lib/post-list';
import { PageWrapper } from '../_components/page-wrapper';
import { PostService } from '@/lib/posts-service.server';

export default async function WritingPage() {
	const posts = await PostService.list();

	return (
		<PageWrapper>
			{/* @ts-expect-error Server Component */}
			<PostList posts={posts} />
		</PageWrapper>
	);
}
