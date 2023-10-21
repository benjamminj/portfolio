import Link, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';

export function A({
	href,
	children,
	...props
}: { href: string } & HTMLAttributes<HTMLAnchorElement>) {
	return (
		<Link href={href as LinkProps<unknown>['href']} {...props}>
			{children}
		</Link>
	);
}
