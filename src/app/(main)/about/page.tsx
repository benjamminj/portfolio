import { H } from "@/lib/h";
import { Markdown } from "@/lib/markdown";
import { readFile } from "@/lib/read-file";

export default async function AboutRoute() {
	const raw = await readFile("about.md");

	return (
		<>
			<H level={1} className="pb-line">
				about me
			</H>

			<Markdown raw={raw} />
		</>
	);
}
