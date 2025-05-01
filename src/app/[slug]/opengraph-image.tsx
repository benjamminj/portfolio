import { getBackgroundCodePatternText } from "@/lib/get-background-code-pattern-text";
import { PostService } from "@/lib/posts-service.server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type PageParams = {
	slug: string;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
	const posts = await PostService.list();
	return posts.map((post) => ({
		slug: post.slug,
		__metadata_id__: post.slug,
	}));
}

export const size = {
	width: 1200,
	height: 630,
};

export async function generateImageMetadata({
	params,
}: { params: PageParams }) {
	const { slug } = await params;
	const post = await PostService.get(slug);
	return [
		{
			id: post.slug,
			alt: post.title,
			contentType: "image/png",
		},
	];
}

export default async function PostOpengraphImage({
	params,
}: { params: PageParams }) {
	const jetbrainsMono = await readFile(
		join(process.cwd(), "src/static/JetBrainsMono-SemiBold.ttf"),
	);

	const backgroundPatternText = getBackgroundCodePatternText(size);
	const { slug } = await params;
	const post = await PostService.get(slug);

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				padding: "2rem",
				position: "relative",
				width: "100%",
				height: "100%",
				background: "black",
				color: "white",
				fontSize: "2rem",
				lineHeight: "3rem",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					overflow: "hidden",
					wordBreak: "break-all",
					color: "transparent",
					backgroundImage: `
            linear-gradient(90deg, rgba(153, 204, 255, 0.15) 0%, rgba(102, 204, 122, 0.15) 100%),
          `,
					backgroundClip: "text",
				}}
			>
				{backgroundPatternText}
			</div>
			<div
				tw="px-8 text-center"
				style={{
					display: "flex",
					fontSize: "6rem",
					lineHeight: "1.2",
				}}
			>
				{post.title}
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "JetBrains Mono",
					data: jetbrainsMono,
					style: "normal",
					weight: 500,
				},
			],
		},
	);
}
