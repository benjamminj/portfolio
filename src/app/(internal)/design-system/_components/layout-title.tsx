"use client";
import { useSelectedLayoutSegment } from "next/navigation";

export function DesignSystemLayoutTitle() {
	const segment = useSelectedLayoutSegment();
	return <h1 className="text-@h5">{segment}</h1>;
}
