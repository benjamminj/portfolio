import type { ReactNode } from "react";
import { Banner } from "./banner";

export function PageWrapper({
	children,
	title,
	subtitle,
}: {
	title?: ReactNode;
	subtitle?: ReactNode;
	children: ReactNode;
}) {
	return (
		<>
			<Banner title={title} subtitle={subtitle} />
			<div className="p-4 py-10 mx-auto my-0 max-w-viewport md:max-w-prose md:min-w-prose flex-grow">
				{children}
			</div>
		</>
	);
}
