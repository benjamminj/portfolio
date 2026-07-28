import { PostService } from "$lib/posts-service.server";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => {
	const posts = await PostService.list();
	return posts.map((post) => ({ slug: post.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const post = await PostService.get(params.slug);

	const urlBase = process.env.URL || process.env.VERCEL_URL;
	const urlBaseHttps = urlBase?.startsWith("https://")
		? urlBase
		: `https://${urlBase}`;

	const meta = {
		description: post.description,
		author: "Benjamin Johnson",
		twitter: {
			card: "summary",
			site: "@benjamminj",
			creator: "@benjamminj",
			title: post.title,
			description: post.description,
		},
		og: {
			title: post.title,
			description: post.description,
			type: "website",
			url: `${urlBaseHttps}/${post.slug}`,
		},
		keywords: post.tags?.length > 0 ? post.tags.join(", ") : undefined,
	};

	return { post, meta };
};
