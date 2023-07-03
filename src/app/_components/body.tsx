'use client';
import { cn } from '@/lib/cn';
import { ReactNode, useEffect, useState } from 'react';

export function Body({ children }: { children: ReactNode }) {
	const [jsEnabled, setJsEnabled] = useState(false);

	// when the component has hydrated + mounted, set jsEnabled to true:
	useEffect(() => {
		setJsEnabled(true);
	}, []);

	return (
		<body
			data-js_enabled={jsEnabled}
			className={cn('dark:bg-gray-800 dark:text-white min-h-screen flex flex-col font-mono')}
		>
			{children}
		</body>
	);
}
