import { PageWrapper } from '@/app/_components/page-wrapper';
import { PostList } from '@/lib/post-list';
import { PostService } from '@/lib/posts-service.server';

export default async function TagRoute({ params }: { params: { tag: string } }) {
	const posts = await PostService.list();
	const filtered = posts.filter((post) => post.tags.includes(params.tag));
	return (
		<PageWrapper
			title={`#${params.tag}`}
			subtitle={`${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`}
		>
			{/* @ts-expect-error Server Component */}
			<PostList posts={filtered} />
		</PageWrapper>
	);
}
