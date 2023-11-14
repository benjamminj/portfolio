import { Card, CardContent } from '../_components/card';

export default function TypographyPage() {
	return (
		<div className="w-full h-full bg-@bg-default text-@fg-default">
			<div className="max-w-screen-md sm:px-8 mx-0 sm:mx-auto pt-8 sm:py-8">
				<h1 className="text-@h5">typography</h1>

				<div className="space-y-12 pt-8">
					<section className="space-y-1">
						<h2 className="text-@h5">headings</h2>
						<Card>
							<CardContent>
								<ul className="space-y-8 ">
									<li className="text-@h1">
										<SampleHeadingText level={1} />
									</li>

									<li className="text-@h2">
										<SampleHeadingText level={2} />
									</li>

									<li className="text-@h3">
										<SampleHeadingText level={3} />
									</li>
									<li className="text-@h4">
										<SampleHeadingText level={4} />
									</li>
									<li className="text-@h5">
										<SampleHeadingText level={5} />
									</li>
									<li className="text-@h6">
										<SampleHeadingText level={6} />
									</li>
								</ul>
							</CardContent>
						</Card>
					</section>

					<section className="space-y-1">
						<h2 className="text-@h5">body</h2>
						<Card>
							<CardContent>
								<ul className="space-y-8">
									<li className="text-@large">
										<SampleBodyText name="body large" />
									</li>
									<li>
										<SampleBodyText name="body medium (default)" />
									</li>
									<li className="text-@small">
										<SampleBodyText name="body small" />
									</li>
									<li className="text-@caption">
										<p>
											This is body text for <b>caption</b>. It is not as long as the heading text.
											It is designed to be read in paragraphs, but shouldn't be as long as most body
											text.
										</p>
									</li>
								</ul>
							</CardContent>
						</Card>
					</section>
				</div>
			</div>
		</div>
	);
}

function SampleHeadingText({ level }: { level: number }) {
	return <>heading {level} with descending text that wraps multiple lines</>;
}

function SampleBodyText({ name }: { name: string }) {
	return (
		<p>
			This is body text for <b>{name}</b>. It is not as long as the heading text. It is designed to
			be read <i>in paragraphs</i>, and should be used for most text on the site. It is not as long
			as the heading text. It is designed to be read in paragraphs, and should be used for most text
			on the site. It is not as long as the heading text. It is designed to be read in paragraphs,
			and should be used for most text on the site. It is not as long as the heading text. It is
			designed to be read in paragraphs, and should be used for most text on the site.
		</p>
	);
}
