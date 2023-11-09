import { NavLink } from './nav-link';

export function Header() {
	return (
		<header className="z-header max-w-viewport" data-sveltekit-prefetch>
			<div className="max-w-prose my-0 mx-auto">
				<div className="justify-between block p-4 space-y-2 sm:flex sm:space-y-0">
					<a
						href="/"
						className="inline-block text-xl font-medium text-black no-underline dark:text-white"
					>
						<span className="lowercase">benjamin johnson</span>
					</a>

					<div className="flex mt-2 space-x-4 lowercase">
						<nav>
							<div className="flex items-center space-x-4">
								<NavLink href="/writing" title="Writing">
									./writing
								</NavLink>

								<NavLink title="About" href="/about">
									./about
								</NavLink>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
