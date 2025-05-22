import {
	type EvaluateOptions,
	type MDXComponents,
	MDXRemote,
} from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { A } from "./a";
import { Callout } from "./callout";
import { cn } from "./cn";
import { Code, Pre } from "./code";
import { H } from "./h";
import { rehypeCallouts } from "./rehype-callouts";
import { Slide } from "./slide";

type MarkdownProps = {
	raw: string;
	className?: string;
};

export async function Markdown({ raw, className }: MarkdownProps) {
	return (
		<div
			className={cn("text-body mx-0 max-w-prose px-0 space-y-line", className)}
		>
			<MDXRemote
				source={raw}
				components={mdxComponents}
				options={{
					mdxOptions,
				}}
			/>
		</div>
	);
}

export const mdxOptions: EvaluateOptions["mdxOptions"] = {
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeCallouts,
		[
			rehypePrettyCode,
			{
				theme: "rose-pine",
				defaultLang: "plaintext",
				keepBackground: false,
			},
		],
	],
};

export const mdxComponents: MDXComponents = {
	a: A,
	h1: ({ children }) => (
		<H level={1} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	h2: ({ children }) => (
		<H level={2} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	h3: ({ children }) => (
		<H level={3} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	h4: ({ children }) => (
		<H level={4} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	h5: ({ children }) => (
		<H level={5} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	h6: ({ children }) => (
		<H level={6} className="mb-line not-first:mt-line-2">
			{children}
		</H>
	),
	code: Code,
	pre: Pre,
	Slide: Slide,
	blockquote: ({ children, "data-variant": variant, ...rest }) => {
		if (variant) {
			return <Callout variant={variant}>{children}</Callout>;
		}
		return (
			<blockquote
				{...rest}
				className="my-line px-4 italic bg-bg-muted/40 backdrop-blur-[1px] border-l-4 border-l-border ring-1 ring-inset ring-bg-muted rounded-xs rounded-l-[1px] space-y-line py-line"
			>
				{children}
			</blockquote>
		);
	},
	hr: () => (
		<hr className="relative h-auto my-line-2 text-center text-fg-muted border-none before:content-['*_*_*'] before:text-heading" />
	),
	ol: ({ children }) => (
		<ol className="my-line list-decimal [&_ol]:list-[lower-alpha] pl-7 space-y-line">
			{children}
		</ol>
	),
	ul: ({ children }) => (
		<ul className="my-line list-disc [&_ul]:list-[circle] pl-5 [&_li]:pl-2 space-y-line">
			{children}
		</ul>
	),
	table: ({ children }) => <table className="border">{children}</table>,
	thead: ({ children }) => <thead className="group/thead">{children}</thead>,
	tbody: ({ children }) => <tbody>{children}</tbody>,
	tr: ({ children }) => <tr>{children}</tr>,
	th: ({ children }) => <th>{children}</th>,
	td: ({ children }) => (
		<td className="border-collapse border align-baseline py-[calc(var(--line-height-base)_/_2_-_0.5px)] px-3">
			{children}
		</td>
	),
};
