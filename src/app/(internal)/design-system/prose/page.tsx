import { Card, CardContent } from '../_components/card';

export default async function ProsePage() {
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<h2 className="text-@h5">headings</h2>
				<Card>
					<CardContent></CardContent>
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
