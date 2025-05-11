import { Markdown } from "@/lib/markdown";
import { readFile } from "@/lib/read-file";

export default async function Page() {
	const raw = await readFile("markdown-test.md");
	return <Markdown raw={raw} __flushEdges />;
}
