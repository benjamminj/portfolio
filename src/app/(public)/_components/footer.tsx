import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export function Footer() {
	return (
		<footer className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 py-8">
			<div className="max-w-prose my-0 mx-auto px-4">
				<p className="dark:text-gray-400">&copy; {new Date().getFullYear()} Benjamin Johnson</p>
				<ul className="flex space-x-4" data-sveltekit-prefetch>
					<li>
						<FooterLink title="GitHub" href="https://github.com/benjamminj">
							github
						</FooterLink>
					</li>
					<li>
						<FooterLink title="Twitter" href="https://twitter.com/benjamminj">
							twitter
						</FooterLink>
					</li>
					<li>
						<FooterLink title="LinkedIn" href="https://www.linkedin.com/in/benjamin-d-johnson/">
							linkedin
						</FooterLink>
					</li>
					<li>
						<FooterLink title="Email" href="/links/email">
							email
						</FooterLink>
					</li>
					<li>
						<FooterLink title="RSS" href="/feed/rss.xml">
							rss
						</FooterLink>
					</li>
				</ul>
			</div>
		</footer>
	);
}

function FooterLink({
	title,
	href,
	children,
}: {
	title: string;
	href: string;
	children: ReactNode;
}) {
	return (
		<Link
			title={title}
			href={href as LinkProps['href']}
			className="text-base underline text-gray-800 dark:text-gray-200 hover:dark:text-white font-bold"
		>
			{children}
		</Link>
	);
}
