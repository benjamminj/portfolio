import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { Card, CardContent } from "../_components/card";
import { Tag } from "../_components/tag";

export default async function TagsPage() {
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<h2 className="text-@h5">default</h2>
				<Card>
					<CardContent>
						<div className="space-y-4">
							<p>
								Tags are a way to classify content. They should usually be links
								to an "index" page showing all content classified by that tag.
							</p>

							<ul className="flex flex-wrap gap-2">
								<li>
									<Tag>#tag-1</Tag>
								</li>
								<li>
									<Tag>#tag-2</Tag>
								</li>
								<li>
									<Tag>#tag-3</Tag>
								</li>
								<li>
									<Tag>#tag-4</Tag>
								</li>
								<li>
									<Tag>#tag-5</Tag>
								</li>
								<li>
									<Tag asChild>
										<a href="https://google.com">google.com (link)</a>
									</Tag>
								</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
