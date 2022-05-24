export type HtmlAstPosition = {
  start: number
  column: number
  offset: number
}
export type HtmlAstNodeCode = HtmlAstNodeBase<'code'> & {
  lang: string
  meta: unknown
  value: string
  children: undefined
}
export type HtmlAstNodeLink = HtmlAstNodeBase<'link'> & {
  url: string
  title: string | null
}
export type HtmlAstNodeText = HtmlAstNodeBase<'text'> & {
  value: string
  children: undefined
}
export type HtmlAstNodeParagraph = HtmlAstNodeBase<'paragraph'>
export type HtmlAstNodeThematicBreak = HtmlAstNodeBase<'thematicBreak'>
export type HtmlAstNodeHeading = HtmlAstNodeBase<'heading'> & { depth: number }
export type HtmlAstNodeStrong = HtmlAstNodeBase<'strong'>
export type HtmlAstNodeEmphasis = HtmlAstNodeBase<'emphasis'>
export type HtmlAstNodeList = HtmlAstNodeBase<'list'> & {
  ordered: boolean
  spread: boolean
  start: number | null
}
export type HtmlAstNodeListItem = HtmlAstNodeBase<'listItem'> & {
  checked: boolean
  spread: boolean
}
export type HtmlAstNodeBlockquote = HtmlAstNodeBase<'blockquote'>
export type HtmlAstNodeInlineCode = HtmlAstNodeBase<'inlineCode'> & {
  children: undefined
}
export type HtmlAstNodeImage = HtmlAstNodeBase<'image'> & {
  url: string
  alt: string
  title: string | null
}

export type HtmlAstNodeMap = {
  heading: HtmlAstNodeHeading
  link: HtmlAstNodeLink
  text: HtmlAstNodeText
  paragraph: HtmlAstNodeParagraph
  thematicBreak: HtmlAstNodeThematicBreak
  strong: HtmlAstNodeStrong
  emphasis: HtmlAstNodeEmphasis
  list: HtmlAstNodeList
  listItem: HtmlAstNodeListItem
  blockquote: HtmlAstNodeBlockquote
  inlineCode: HtmlAstNodeInlineCode
  code: HtmlAstNodeCode
  image: HtmlAstNodeImage
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

export type HtmlAstNodeBase<T> = {
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
