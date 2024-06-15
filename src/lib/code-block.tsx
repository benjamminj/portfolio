'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from './cn';

export function CodeBlock({ code }: { code: string }) {
	const ref = useRef<HTMLElement>(null);
	// TODO: clean this up, make it less useEffect-ey
	const [innerText, setInnerText] = useState('');
	useEffect(() => {
		if (ref.current) {
			setInnerText(ref.current.innerText);
		}
	}, []);

	return (
		<div className="relative">
			<div className="hidden js-enabled:block">
				<CopyPasteButton code={innerText} />
			</div>

			<pre
				className={cn(
					'rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-@bg-muted md:mx-0 lg:-mx-6 selection:bg-@black selection:text-@white'
				)}
			>
				<code
					dangerouslySetInnerHTML={{ __html: code }}
					className={cn(
						'overflow-auto text-@fg-default bg-transparent p-0 text-left whitespace-pre',
						// Color theme definitions
						'[--accent-1:rgb(var(--color-blue-700))] dark:[--accent-1:rgb(var(--color-blue-300))]',
						'[--accent-2:rgb(var(--color-green-600))] dark:[--accent-2:rgb(var(--color-green-300))]',
						'[--accent-3:rgb(var(--color-purple-600))] dark:[--accent-3:rgb(var(--color-purple-300))]',
						'[--accent-positive:rgb(var(--color-green-700))] dark:[--accent-positive:rgb(var(--color-green-400))]',
						'[--accent-negative:rgb(var(--color-red-700))] dark:[--accent-negative:rgb(var(--color-red-400))]',

						// Token color mappings
						'[&_.token:is(.comment,.prolog,.doctype,.cdata)]:text-gray-500',
						'[&_.token:is(.punctuation)]:text-gray-500',
						'[&_.token:is(.regex,.important,.variable)]:text-gray-500',

						'[&_.token:is(.namespace)]:opacity-75',

						// Default text colors styles
						'[&_.token:is(.property,.boolean,.number,.constant,.symbol)]:text-[color:var(--accent-3)]',
						'[&_.token:is(.tag)]:text-[color:var(--accent-2)]',
						'[&_.token:is(.attr-name)]:text-[color:var(--accent-3)]',
						'[&_.token:is(.selector,.attr,.string,.char,.builtin)]:text-[color:var(--accent-2)]',
						'[&_:is(.token.operator,.token.entity,.token.url,[class=".language-css"],.style_.token.string,)]:text-[color:var(--accent-1)]',
						'[&_.token:is(.atrule,.attr-value,.keyword)]:text-[color:var(--accent-1)]',
						'[&_:is(.token.function)]:text-[color:var(--accent-1)]',

						// Diff styles
						'[&_.token:is(.deleted)]:text-[color:var(--accent-positive)]',
						'[&_.token:is(.inserted)]:text-[color:var(--accent-negative)]',

						// Different font weights, cursors, etc.
						'[&_.token:is(.important,.bold)]:font-bold',
						'[&_.token:is(.italic)]:italic',
						'[&_.token:is(.entity)]:cursor-help'
					)}
					ref={ref}
				></code>
			</pre>
		</div>
	);
}

function CopyPasteButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => {
				setCopied(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [copied]);

	return (
		<button
			type="button"
			onClick={() => {
				setCopied(true);
				navigator.clipboard.writeText(code);
			}}
			className="absolute -right-3 flex items-center justify-center w-8 h-8 text-gray-700 dark:text-white text-opacity-50 md:right-2 top-1 ring-gray-400 dark:ring-white ring-opacity-70 focus:outline-none focus:bg-gray-300 focus:bg-opacity-20 focus:text-opacity-100 hover:text-opacity-100 focus:ring-2"
		>
			{copied ? (
				<div className="relative">
					<CheckIcon aria-hidden="true" className="w-5 h-5 text-green-600 dark:text-green-400" />
					<div className="fixed z-10 px-2 py-2 mt-2 text-black dark:text-white text-opacity-100 transform bg-white shadow-md dark:bg-gray-600 bottom-2 left-2 right-2 xs:py-1 xs:-translate-x-2/3 xs:absolute xs:right-auto xs:bottom-auto xs:left-1/2 xs:top-full md:-translate-x-1/2 animate-fadein [animation-fill-mode:both] opacity-0">
						Copied!
					</div>
				</div>
			) : (
				<>
					<ClipboardIcon
						aria-hidden="true"
						className="w-5 h-5 dark:text-gray-400 hover:dark:text-white transition-colors"
					/>
					<span className="sr-only">Copy to clipboard</span>
				</>
			)}
		</button>
	);
}

type SVGProps = React.SVGProps<SVGSVGElement>;
function CheckIcon(props: SVGProps) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
		</svg>
	);
}

function ClipboardIcon(props: SVGProps) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
			/>
		</svg>
	);
}
