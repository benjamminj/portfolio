import type { HtmlAstNode, HtmlAst } from './hast.types';

/**
 * Given a HAST node, remove the position. This is not used by the markdown rendering
 * and dramatically decreases the size of the payload (sometimes up to 50% smaller!!)
 */
const pruneHastNode = (node: HtmlAstNode): Omit<HtmlAstNode, 'position'> => {
	const { position: _position, ...rest } = node;
	return rest;
};

/**
 * This prunes down a given HAST node recursively to remove the position.
 */
export const pruneAst = (ast: HtmlAst) => {
	type TransformedNode = Omit<HtmlAstNode, 'position' | 'children'> & {
		children?: TransformedNode[];
	};

	const transformHastNode = (node: HtmlAstNode): TransformedNode => {
		let children: TransformedNode[] | undefined;

		if (node.children) {
			const transformedChildren: TransformedNode[] = node.children.map(transformHastNode);
			children = transformedChildren;
		}

		const { children: _, ...pruned } = pruneHastNode(node);
		return {
			...pruned,
			children
		};
	};

	const transformedChildren = ast.children.map(transformHastNode);
	const { children: _children, position: _pos, ...rest } = ast;
	return {
		...rest,
		children: transformedChildren
	};
};
