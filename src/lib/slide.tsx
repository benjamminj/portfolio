import type { ReactNode } from "react";
import { cn } from "./cn";

export type SlideProps = {
	children: ReactNode;
	image: string;
	className?: string;
};

export function Slide({ children, image, className }: SlideProps) {
	return <div>{children}</div>;
}
