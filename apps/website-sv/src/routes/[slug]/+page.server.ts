import { PostService } from "$lib/posts-service.server";
import type { PageServerLoad } from "./[slug]/$types";

export const load: PageServerLoad = async ({ params }) => {
	const post = await PostService.get(params.slug);

	const urlBase = process.env.URL || process.env.VERCEL_URL;
	const urlBaseHttps = urlBase?.startsWith("https://")
		? urlBase
		: `https://${urlBase}`;

	// export async function generateMetadata({
	// 	params,
	// }: { params: SlugPageParams }): Promise<Metadata> {
	// 	const { slug } = await params;
	// 	const post = await PostService.get(slug);

	// 	const urlBase = process.env.URL || process.env.VERCEL_URL;
	// 	const urlBaseHttps = urlBase?.startsWith("https://")
	// 		? urlBase
	// 		: `https://${urlBase}`;
	// 	return {
	// 		description: post.description,
	// 		authors: { name: "Benjamin Johnson" },
	// 		twitter: {
	// 			card: "summary",
	// 			site: "@benjamminj",
	// 			creator: "@benjamminj",
	// 			title: post.title,
	// 			description: post.description,
	// 		},
	// 		metadataBase: new URL(urlBaseHttps),
	// 		openGraph: {
	// 			title: post.title,
	// 			description: post.description,
	// 			type: "website",
	// 			url: `/${slug}`,
	// 		},
	// 		keywords: post.tags?.length > 0 ? post.tags.join(", ") : undefined,
	// 	};
	// }

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
