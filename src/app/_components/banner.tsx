import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

export function Banner({ title, subtitle }: { title?: ReactNode; subtitle?: ReactNode }) {
	const preserveTitleCasing = true;
	return (
		<div>
			<div className="flex items-end pt-48 pb-8 bg-gray-100 min-h-32 dark:bg-gray-900">
				<div className="w-full px-4 mx-auto my-0 max-w-viewport md:max-w-prose">
					<div className="space-y-4">
						{title && (
							<h1
								className={cn(
									'text-5xl font-bold break-words',
									!preserveTitleCasing && 'lowercase'
								)}
							>
								{title}
							</h1>
						)}

						{subtitle && (
							<h2 className="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
								{subtitle}
							</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
