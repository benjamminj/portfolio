import Link, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';

export function A({
	href,
	children,
	...props
}: { href: string } & HTMLAttributes<HTMLAnchorElement>) {
	// TODO: semantic token for link color?
	const className =
		'underline text-@medium cursor-pointer text-@blue-600 hover:text-@blue-700 dark:text-@blue-500 dark:hover:text-blue-400';

	if (href === '') {
		return (
			<a {...props} className={className}>
				<b>{children}</b>
			</a>
		);
	}

	return (
		<Link href={href as LinkProps['href']} {...props} className={className}>
			<b>{children}</b>
		</Link>
	);
}
