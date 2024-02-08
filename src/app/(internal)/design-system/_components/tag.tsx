import { Slot } from '@radix-ui/react-slot';
import { ReactNode } from 'react';

export function Tag({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
	const Component = asChild ? Slot : 'span';

	return <Component className="text-@fg-muted text-@small">{children}</Component>;
}
