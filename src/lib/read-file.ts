export const readFile = async (contentPath: string) => {
	const map = await import.meta.glob(`../../content/**/*.md`, { as: 'raw' });
	const paths = Object.keys(map);
	const path = paths.find((path) => path.endsWith(contentPath));

	if (!path) {
		throw new Error(`No such file: ${contentPath}`);
	}

	const raw = await map[path]();
	return raw;
};
