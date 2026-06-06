import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Makes it easier to use clsx with tailwindcss, and guarantees that classes
 * added later in the string take precedence when merging.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
