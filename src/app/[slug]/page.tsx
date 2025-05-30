import { Markdown } from "@/lib/markdown";
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
}
