type HtmlAstPosition = {
	start: number
	column: number
	offset: number
}
type HtmlAstNodeCode = HtmlAstNodeBase<'code'> & {
	lang: string
	meta: unknown
	value: string
	children: undefined
}
type HtmlAstNodeLink = HtmlAstNodeBase<'link'> & { url: string; title: string | null }
type HtmlAstNodeText = HtmlAstNodeBase<'text'> & { value: string; children: undefined }
type HtmlAstNodeParagraph = HtmlAstNodeBase<'paragraph'>
type HtmlAstNodeThematicBreak = HtmlAstNodeBase<'thematicBreak'>
type HtmlAstNodeHeading = HtmlAstNodeBase<'heading'> & { depth: number }
type HtmlAstNodeStrong = HtmlAstNodeBase<'strong'>
type HtmlAstNodeEmphasis = HtmlAstNodeBase<'emphasis'>
type HtmlAstNodeList = HtmlAstNodeBase<'list'> & {
	ordered: boolean
	spread: boolean
	start: number | null
}
type HtmlAstNodeListItem = HtmlAstNodeBase<'listItem'> & {
	checked: boolean
	spread: boolean
}
type HtmlAstNodeBlockquote = HtmlAstNodeBase<'blockquote'>
type HtmlAstNodeInlineCode = HtmlAstNodeBase<'inlineCode'> & { children: undefined }
type HtmlAstNodeImage = HtmlAstNodeBase<'image'> & {
	url: string
	alt: string
	title: string | null
}

export type HtmlAstNode =
	| HtmlAstNodeHeading
	| HtmlAstNodeCode
	| HtmlAstNodeLink
	| HtmlAstNodeText
	| HtmlAstNodeParagraph
	| HtmlAstNodeThematicBreak
	| HtmlAstNodeStrong
	| HtmlAstNodeEmphasis
	| HtmlAstNodeList
	| HtmlAstNodeListItem
	| HtmlAstNodeBlockquote
	| HtmlAstNodeInlineCode
	| HtmlAstNodeImage

type HtmlAstNodeBase<T> = {
	type: T
	// TODO: a node either has value or children or neither...the contents depend
	// the tag and the child nodes
	value?: string
	children?: HtmlAstNode[]
	position: {
		start: HtmlAstPosition
		stop: HtmlAstPosition
	}
}

export type HtmlAst = {
	type: 'root'
	children: HtmlAstNode[]
	position: HtmlAstPosition
}

/**
 * Given a HAST node, remove the position. This is not used by the markdown rendering
 * and dramatically decreases the size of the payload (sometimes up to 50% smaller!!)
 */
const pruneHastNode = (node: HtmlAstNode): Omit<HtmlAstNode, 'position'> => {
	const { position: _position, ...rest } = node
	return rest
}

/**
 * @todo docsssss
 */
export const pruneAst = (ast: HtmlAst) => {
	type TransformedNode = Omit<HtmlAstNode, 'position' | 'children'> & {
		children?: TransformedNode[]
	}

	// TODO: better naming, since this is the inner fn!!
	const transformHastNode = (node: HtmlAstNode): TransformedNode => {
		let children: TransformedNode[] | undefined

		if (node.children) {
			const transformedChildren: TransformedNode[] = node.children.map(transformHastNode)
			children = transformedChildren
		}

		const { children: _, ...pruned } = pruneHastNode(node)
		return {
			...pruned,
			children
		}
	}

	const transformedChildren = ast.children.map(transformHastNode)
	const { children: _children, position: _pos, ...rest } = ast
	return {
		...rest,
		children: transformedChildren
	}
}
