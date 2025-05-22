import { mdxComponents, mdxOptions } from "@/lib/markdown";
import { readFile } from "@/lib/read-file";
import type { Node, Root, RootContent } from "mdast";
import { evaluate } from "next-mdx-remote-client/rsc";
import { visit } from "unist-util-visit";
import type { ReactNode } from "react";
import { get } from "lodash";
import Link from "next/link";

type SlideMetadata = {
	image?: string;
};

/**
 * Remark plugin that filters MDX content to only include the slide at the specified index
 */
function createRemarkNthScreenPlugin({
	index,
	onSlideFound,
}: {
	index: number;
	onSlideFound: (slide: SlideMetadata) => void;
}) {
	return () => {
		return (tree: Root) => {
			const slideNodes: Node[] = [];

			visit(tree, "mdxJsxFlowElement", (node: Node) => {
				if ("name" in node && node.name === "Slide") {
					slideNodes.push(node);

					if ("attributes" in node && Array.isArray(node.attributes)) {
						// Extract image from attributes
						const imageAttr = node.attributes?.find(
							(attr: unknown) => get(attr, "name") === "image",
						);
						if (imageAttr) {
							onSlideFound({ image: imageAttr.value });
						}
					}
				}
			});

			const targetSlide = slideNodes[index] ?? slideNodes[0];
			if (!targetSlide) return;
			tree.children = [targetSlide as RootContent];
		};
	};
}

export default async function ProjectTestPage() {
	const fileContents = await readFile(
		"projects/ecommerce-redesign-test/ecommerce-redesign-test.mdx",
		"mdx",
	);

	let slideMetadata: SlideMetadata | undefined;

	const mdxOptionsWithFirstScreen = {
		...mdxOptions,
		remarkPlugins: [
			...(mdxOptions?.remarkPlugins || []),
			createRemarkNthScreenPlugin({
				index: 0,
				onSlideFound: (slide) => {
					slideMetadata = slide;
				},
			}),
		],
	};

	const result = await evaluate({
		source: fileContents,
		options: {
			mdxOptions: mdxOptionsWithFirstScreen,
			parseFrontmatter: true,
		},
		components: mdxComponents,
	});

	return (
		<div className="grid grid-cols-2 min-h-screen">
			<div className="p-line">
				<header className="mb-line-2">
					<Link href="/" className="hover:underline lowercase text-heading">
						Benjamin Johnson
					</Link>
				</header>
				<div className="space-y-line-2">{result.content}</div>
			</div>
			<div className="bg-[#f5f5f5] min-h-screen">
				{slideMetadata?.image && (
					<img
						src={slideMetadata.image}
						alt=""
						className="w-full h-full object-cover"
					/>
				)}
			</div>
		</div>
	);
}
