import { readFile } from "$lib/read-file";
import type { PageServerLoad } from "./$types";
import type { Clipping } from "./config";

export const load: PageServerLoad = async () => {
	const raw = await readFile("clippings.json", "json");
	const clippings = JSON.parse(raw) as Clipping[];

	return { clippings };
};
