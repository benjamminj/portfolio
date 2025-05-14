"use client";

import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	createContext,
	useContext,
} from "react";

const PreContext = createContext<boolean>(false);

export const Pre = ({
	children,
	...props
}: { children: ReactNode } & ComponentPropsWithoutRef<"pre">) => {
	return (
		<pre
			className="relative p-line overflow-auto rounded-xs bg-gray-900 text-white"
			{...props}
		>
			<PreContext.Provider value={true}>{children}</PreContext.Provider>
		</pre>
	);
};

export const Code = ({
	children,
	className,
	...props
}: {
	children: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<"code">) => {
	const isWithinPreformattedBlock = useContext(PreContext);

	if (isWithinPreformattedBlock) {
		return <code>{children}</code>;
	}

	return (
		<code className="inline-block bg-bg-emphasis/10 backdrop-blur-xs text-fg break-words before:content-['`'] before:font-bold before:text-fg/60 after:content-['`'] after:font-bold after:text-fg/60 rounded-xs">
			{children}
		</code>
	);
};
