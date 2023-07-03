import { Markdown } from '@/lib/markdown';
import { PageWrapper } from '../_components/page-wrapper';
import { PostService } from '@/lib/posts-service.server';
import { Metadata } from 'next';
import { A } from '@/lib/a';
import { Tag } from '@/lib/tag';

type PageParams = {
	slug: string;
};

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
	const slug = params.slug;
	const post = await PostService.get(slug);

	return {
		description: post.description,
		authors: { name: 'Benjamin Johnson' },
		twitter: {
			card: 'summary',
			site: '@benjamminj',
			creator: '@benjamminj',
			title: post.title,
			description: post.description,
		},
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'website',
			url: `${process.env.URL || process.env.VERCEL_URL}/${slug}`,
		},
		keywords: post.tags?.length > 0 ? post.tags.join(', ') : undefined,
	};
}

export default async function SlugPage({ params }: { params: PageParams }) {
	const slug = params.slug;
	const post = await PostService.get(slug);
	return (
		<>
			{/* <svelte:head>
	<meta name="description" content={data.post.description} />
	<meta name="author" content="Benjamin Johnson" />
	<!-- twitter meta tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@benjamminj" />
	<meta name="twitter:creator" content="@benjamminj" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.post.description} />
	<!-- og meta tags -->
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{data.HOMEPAGE}/{data.slug}" />

	{#if hasTags}
		<meta name="keywords" content={data.post.tags.join(', ')} />
	{/if}
</svelte:head> */}

			<PageWrapper title={post.title} subtitle={post.date}>
				<Markdown raw={post.body} />
				{post.link && post.publisher && (
					<p className="pt-4 prose dark:prose-invert">
						<A title={post.publisher} href={post.link}>
							Read the full article on {post.publisher}.
						</A>
					</p>
				)}

				{post.tags?.length > 0 && (
					<footer data-testid="SlugPage__footer" className="pt-12">
						<div>
							<div className="font-mono dark:text-gray-400">Tags</div>
							<ul className="dark:text-gray-200 flex space-x-2">
								{post.tags.map((tag) => (
									<li key={tag}>
										<Tag tag={tag} />
									</li>
								))}
							</ul>
						</div>
					</footer>
				)}
			</PageWrapper>

			{/* <!-- {data.post?.link && data?.post?.publisher && ( -->
{#if data.post.link && data.post.publisher}
	<p class="pt-4 prose dark:prose-invert">
		<A title={data.post.publisher} href={data.post.link}>
			Read the full article on {data.post.publisher}.
		</A>
	</p>
{/if}

{#if hasTags}
	<!-- TODO: multiple footers, or is something else more appropriate? -->
	<footer data-testid="SlugPage__footer" class="pt-12">
		<div>
			<div class="font-mono dark:text-gray-400">Tags</div>
			<ul class="dark:text-gray-200 flex space-x-2">
				{#each data.post.tags as tag}
					<li>
						<Tag {tag} />
					</li>
				{/each}
			</ul>
		</div>
	</footer>
{/if} */}
		</>
	);
}
