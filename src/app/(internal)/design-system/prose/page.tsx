import { Markdown } from "@/lib/markdown";
import { readFile } from "@/lib/read-file";
import { Card, CardContent } from "../_components/card";

export default async function ProsePage() {
	const raw = await readFile("markdown-test.md");
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<Card className="pb-0">
					<CardContent className="pb-0">
						<Markdown raw={raw} />
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
