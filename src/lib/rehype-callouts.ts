import { visit } from "unist-util-visit";
import type { Element, Root, Text } from "hast";
import { CALLOUT_VARIANTS } from "./callout";

/**
 * Adds parsing for Github-style callouts to the HAST tree.
 */
export function rehypeCallouts() {
	return (tree: Root) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName !== "blockquote") return;

			let variant: string | undefined;

			// Visit paragraphs within blockquote
			visit(node, "element", (child: Element, _index, parent) => {
				if (child.tagName !== "p" || parent !== node) return;

				// Visit text nodes within paragraph
				visit(child, "text", (text: Text) => {
					const match = CALLOUT_VARIANTS.find(
						(variant) => text.value === `[!${variant}]`,
					);
					if (match) {
						variant = match.toLowerCase();
						// Remove the paragraph containing directive
						node.children = node.children.filter((n) => n !== child);
						// Stop visiting, we found what we needed.
						return;
					}
				});

				// Stop after finding first match
				if (variant) return;
			});

			if (variant) {
				node.properties = node.properties || {};
				node.properties["data-variant"] = variant;
			}
		});
	};
}
