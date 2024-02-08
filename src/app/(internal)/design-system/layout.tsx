import { cn } from '@/lib/cn';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Card, CardContent } from './_components/card';
import { DesignSystemLayoutTitle } from './_components/layout-title';
import { NavLink } from './_components/nav-link';

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid [grid-template-columns:auto_minmax(0,1fr)] text-@medium min-h-screen">
			<details className="group sticky top-0 max-h-screen bg-@bg-muted text-@fg-default w-0 open:w-[200px] transition-[width]">
				<summary className="block">
					<span className="absolute top-0 -right-8 rounded-none bg-@bg-emphasis text-@fg-on-emphasis w-8 h-8 inline-flex items-center justify-center hover:cursor-pointer">
						<span className="hidden group-open:block">{'<'}</span>
						<span className="block group-open:hidden">{'>'}</span>
					</span>
				</summary>

				<nav className="p-4 border-r-2 border-@border-default h-full">
					<h2 className="text-@h5 flex items-center">design system</h2>
					<ul className="space-y-4 overflow-hidden py-4">
						<DesignSystemNavItem path="/typography">typography</DesignSystemNavItem>
						<DesignSystemNavItem path="/colors">colors</DesignSystemNavItem>
						<DesignSystemNavItem path="/card">card</DesignSystemNavItem>
						<DesignSystemNavItem path="/table">table</DesignSystemNavItem>
						<DesignSystemNavItem path="/tag">tag</DesignSystemNavItem>
						<DesignSystemNavItem path="/prose">prose elements (todo)</DesignSystemNavItem>
					</ul>
				</nav>
			</details>

			<div>
				<div className="w-full h-full bg-@bg-default text-@fg-default">
					<div className="max-w-screen-md sm:px-8 mx-0 sm:mx-auto pt-12 sm:py-12">
						<DesignSystemLayoutTitle />

						<div className="pt-8">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DesignSystemNavItem({ children, path }: { children: ReactNode; path: string }) {
	return (
		<li className="leading-none">
			<NavLink href={`/design-system${path}`}>{children}</NavLink>
		</li>
	);
}
