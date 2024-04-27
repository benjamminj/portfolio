import { Card, CardContent } from '../_components/card';

export default async function ProsePage() {
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<h2 className="text-@h5">headings</h2>
				<Card>
					<CardContent>
						<div className="prose dark:prose-invert">
							<h2>heading 1</h2>
							<h3>heading 2</h3>
							<h4>heading 3</h4>
							<h5>heading 4</h5>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-1">
				<h2 className="text-@h5">paragraphs</h2>
				<Card>
					<CardContent></CardContent>
				</Card>
			</section>
		</div>
	);
}
