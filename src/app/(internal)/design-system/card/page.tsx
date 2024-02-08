import { Card, CardContent } from '../_components/card';

export default async function CardsPage() {
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<h2 className="text-@h5">default</h2>
				<Card>
					<CardContent>
						<div className="space-y-4">
							<p>
								Cards are a visual way to separate content into visually distinct sections. They
								carry no semantic meaning on their own.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
