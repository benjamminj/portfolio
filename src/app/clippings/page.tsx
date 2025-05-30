import { A } from "@/lib/a";
import { H } from "@/lib/h";
import { readFile } from "@/lib/read-file";
import { Tag } from "@/lib/tag";
import Link from "next/link";

type Clipping = {
	name: string;
	url: string;
	tags: string[];
};

export default async function ClippingsRoute() {
	const raw = await readFile("clippings.json", "json");
	const clippings = JSON.parse(raw) as Clipping[];

	return (
		<>
			<div className="pb-line">
				<H level={1}>clippings</H>
				<p className="italic lowercase text-small text-fg-muted">
					Articles, blogs, and other links I've found interesting.
				</p>
			</div>

			<ul className="space-y-line">
				{clippings.map((clipping) => (
					<li key={clipping.url}>
						<Link
							className="text-heading hover:underline"
							href={clipping.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{clipping.name}
						</Link>
						{clipping.tags.length > 0 && (
							<div className="flex gap-ch flex-wrap">
								{clipping.tags.map((tag) => (
									<Tag key={tag} tag={tag} />
								))}
							</div>
						)}
					</li>
				))}
			</ul>
		</>
	);
}
