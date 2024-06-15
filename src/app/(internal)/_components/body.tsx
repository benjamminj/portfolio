'use client';
import { useJsEnabled } from '@/lib/use-js-enabled';
import { ReactNode } from 'react';

export function Body({ children }: { children: ReactNode }) {
	const jsEnabled = useJsEnabled();

	return <body data-js_enabled={jsEnabled}>{children}</body>;
}
