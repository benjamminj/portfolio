import { cn } from '@/lib/cn';
import Link from 'next/link';
import { ReactNode } from 'react';
import { NavLink } from './_components/nav-link';

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid [grid-template-columns:200px_minmax(0,1fr)] text-@medium min-h-screen">
			<nav className="border-r-2 border-@border-default py-8 px-6 sticky top-0 max-h-screen bg-@bg-default text-@fg-default">
				<button
					className="absolute top-0 -right-10 rounded-none bg-@bg-emphasis text-@fg-on-emphasis w-10 h-10 content-center"
					type="button"
				>
					{'<'}
				</button>
				<ul className="space-y-4 overflow-hidden">
					<li>
						<NavLink href="/design-system/typography">typography</NavLink>
					</li>
					<li>
						<NavLink href="/design-system/colors">colors</NavLink>
					</li>
					<li>
						<NavLink href="/design-system/card">card</NavLink>
					</li>
					<li>
						<NavLink href="/design-system/table">table</NavLink>
					</li>
					<li>
						<NavLink href="/">tag (todo)</NavLink>
					</li>
					<li>
						<NavLink href="/">button (todo)</NavLink>icon{' '}
					</li>
					<li>
						<NavLink href="/">prose (todo)</NavLink>
					</li>
				</ul>
			</nav>

			<div>{children}</div>
		</div>
	);
}
