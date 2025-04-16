import { Markdown } from "@/lib/markdown";
import { PageWrapper } from "../_components/page-wrapper";
import { PostService } from "@/lib/posts-service.server";
import type { Metadata } from "next";
import { A } from "@/lib/a";
import { Tag } from "@/lib/tag";

type PageParams = {
	slug: string;
};

export default async function SlugPage({ params }: { params: PageParams }) {
	const slug = await params.slug;
	const post = await PostService.get(slug);
	return (
		<PageWrapper title={post.title} subtitle={post.date}>
			<Markdown raw={post.body} />
			{post.link && post.publisher && (
				<p className="pt-4 max-w-prose mx-auto">
					<A title={post.publisher} href={post.link}>
						Read the full article on {post.publisher}.
					</A>
				</p>
			)}

			{post.tags?.length > 0 && (
				<footer
					data-testid="SlugPage__footer"
					className="pt-12 mx-auto max-w-prose px-4"
				>
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
	);
}

export async function generateMetadata({
	params,
}: { params: PageParams }): Promise<Metadata> {
	const slug = await params.slug;
	const post = await PostService.get(slug);

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
		openGraph: {
			title: post.title,
			description: post.description,
			type: "website",
			url: `${process.env.URL || process.env.VERCEL_URL}/${slug}`,
		},
		keywords: post.tags?.length > 0 ? post.tags.join(", ") : undefined,
	};
}

export async function generateStaticParams() {
	const posts = await PostService.list();
	return posts.map((post) => ({ slug: post.slug }));
}
