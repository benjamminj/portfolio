import { readFile } from "@/lib/read-file";
import { PageWrapper } from "../_components/page-wrapper";
import { Markdown } from "@/lib/markdown";

export default async function AboutRoute() {
	const raw = await readFile("about.md");

	return (
		<PageWrapper title="About me">
			<Markdown raw={raw} />
		</PageWrapper>
	);
}
