import type { Root, RootContent } from "hast";
import { filter } from "unist-util-filter";
import { visit } from "unist-util-visit";

export function slimAst(tree: Root) {
	delete tree.position;

	visit(tree, (node) => {
		delete node.position;
	});
	// const filtered = filter(tree, (node) => {
	// 	const n = node as RootContent;
	// 	if (n.type === "text" && n.value === "\n") return false;
	// 	return true;
	// });

	// return filtered;
}
