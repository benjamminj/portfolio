import type { Root } from "mdast";
import { visit } from "unist-util-visit";

export function slimAst(tree: Root) {
	delete tree.position;

	visit(tree, (node) => {
		delete node.position;
	});
}
