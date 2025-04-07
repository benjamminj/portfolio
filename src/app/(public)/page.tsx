import { readFile } from '@/lib/read-file';
import { PageWrapper } from './_components/page-wrapper';
import { Markdown } from '@/lib/markdown';
import { PostList } from '@/lib/post-list';
import Link from 'next/link';
import { PostService } from '@/lib/posts-service.server';

export default async function Page() {
	const file = await readFile('intro.md');
	const posts = await PostService.list();
	return (
		<PageWrapper
			title="Hi, I'm Ben!"
			subtitle="I'm a frontend software engineer based out of Seattle"
		>
			<Markdown raw={file} />

			<PostList posts={posts.slice(0, 5)} />

			<Link
				href="/writing"
				className="underline font-bold py-4 flex hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-50"
			>
				{/**
				 * This is a spacer to make the "see more posts" text appear inline
				 * with the `PostListItem` components.
				 */}
				<span className="opacity-0 not-sr-only select-none w-[10ch]" />
				see all posts
			</Link>
		</PageWrapper>
	);
}
