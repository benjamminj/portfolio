/**
 * Flattens out a mapped TS type into a single object type. This
 * doesn't do much for type correctness but it makes IDE type hints
 * a little easier to understand without diving into the underlying
 * types.
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
