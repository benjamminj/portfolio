import { glob } from "glob";
import fs from "node:fs/promises";
import path from "node:path";

export const readFile = async (contentPath: string, extension = "md") => {
	const map = await glob(`**/content/**/*.${extension}`);
	const filePath = map.findIndex((path) => path.endsWith(contentPath));

	if (filePath < 0) {
		throw new Error(`No such file: ${contentPath}`);
	}

	const raw = await fs.readFile(map[filePath], "utf-8");
	return raw;
};
