
<!-- TODO: prerender all the things so we have these pages up front. -->
<!-- 
export async function generateStaticParams() {
	const posts = await PostService.list();
	return posts.map((post) => ({ slug: post.slug }));
}
-->

<script lang="ts">
	import { flatten } from "flat";

	import A from "$lib/a.svelte";
	import H from "$lib/h.svelte";
	import Markdown from "$lib/markdown.svelte";
	import Tag from "$lib/tag.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const meta = $derived(
		flatten<typeof data.meta, Record<string, string | undefined>>(data.meta, {
			delimiter: ":",
		}),
	);
</script>

<svelte:head>
	{#each Object.keys(meta) as key}
		{const content = meta[key]}
		{#if content}
			<meta name={key} content={content} />
		{/if}
	{/each}
</svelte:head>

<H level={1} class="mb-line">
	{data.post.title}
</H>

<Markdown ast={data.post.ast} />

{#if data.post.link && data.post.publisher}
	<p class="pt-line max-w-prose mx-auto">
		<A title={data.post.publisher} href={data.post.link}>
			Read the full article on {data.post.publisher}.
		</A>
	</p>
{/if}

{#if data.post.tags?.length > 0}
	<footer
		data-testid="SlugPage__footer"
		class="pt-line-2 max-w-prose text-fg-muted"
	>
		<div>
			<div class="text-small lowercase">Last updated {data.post.date}</div>

			<ul class="flex space-x-2">
				{#each data.post.tags as tag}
					<li>
						<Tag {tag} />
					</li>
				{/each}
			</ul>
		</div>
	</footer>
{/if}

<!-- import { Markdown } from "@/lib/markdown";
import { PostService } from "@/lib/posts-service.server";
import type { Metadata } from "next";
import { A } from "@/lib/a";
import { Tag } from "@/lib/tag";
import { H } from "@/lib/h";

export type SlugPageParams = {
	slug: string;
};

export default async function SlugPage({ params }: { params: SlugPageParams }) {
	const { slug } = await params;
	const post = await PostService.get(slug);
	return (
		<>
			<H level={1} className="mb-line">
				{post.title}
			</H>

			<Markdown raw={post.body} />

			{post.link && post.publisher && (
				<p className="pt-line max-w-prose mx-auto">
					<A title={post.publisher} href={post.link}>
						Read the full article on {post.publisher}.
					</A>
				</p>
			)}

			{post.tags?.length > 0 && (
				<footer
					data-testid="SlugPage__footer"
					className="pt-line-2 max-w-prose text-fg-muted"
				>
					<div>
						<div className="text-small lowercase">Last updated {post.date}</div>

						<ul className="flex space-x-2">
							{post.tags.map((tag) => (
								<li key={tag}>
									<Tag tag={tag} />
								</li>
							))}
						</ul>
					</div>
				</footer>
			)}
		</>
	);
}

export async function generateMetadata({
	params,
}: { params: SlugPageParams }): Promise<Metadata> {
	const { slug } = await params;
	const post = await PostService.get(slug);

	const urlBase = process.env.URL || process.env.VERCEL_URL;
	const urlBaseHttps = urlBase?.startsWith("https://")
		? urlBase
		: `https://${urlBase}`;
	return {
		description: post.description,
		authors: { name: "Benjamin Johnson" },
		twitter: {
			card: "summary",
			site: "@benjamminj",
			creator: "@benjamminj",
			title: post.title,
			description: post.description,
		},
		metadataBase: new URL(urlBaseHttps),
		openGraph: {
			title: post.title,
			description: post.description,
			type: "website",
			url: `/${slug}`,
		},
		keywords: post.tags?.length > 0 ? post.tags.join(", ") : undefined,
	};
}

export async function generateStaticParams() {
	const posts = await PostService.list();
	return posts.map((post) => ({ slug: post.slug }));
} -->
