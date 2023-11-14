import { Card, CardContent } from '../_components/card';

export default async function CardsPage() {
	return (
		<div className="w-full h-full bg-@bg-default text-@fg-default">
			<div className="max-w-screen-md sm:px-8 mx-0 sm:mx-auto pt-8 sm:py-8">
				<h1 className="text-@h5">card</h1>

				<div className="space-y-12 pt-8">
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
			</div>
		</div>
	);
}
