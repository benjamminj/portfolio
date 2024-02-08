import { cn } from '@/lib/cn';
import { Card, CardContent } from '../_components/card';

export default async function ColorsPage() {
	return (
		<div className="space-y-12">
			<section className="space-y-1">
				<h2 className="text-@h5">base</h2>
				<Card>
					<CardContent>
						<div className="space-y-4">
							<p>
								Base color tokens are the foundation of the color system. Each token represents a
								single shade of a given hue. The shade at the given token should <i>not</i> change
								when a theme is changes (i.e. light/dark mode).
							</p>

							<ColorSwatchGroup
								name="gray"
								textInflectionPoint={500}
								colors={[
									'bg-@gray-50',
									'bg-@gray-100',
									'bg-@gray-200',
									'bg-@gray-300',
									'bg-@gray-400',
									'bg-@gray-500',
									'bg-@gray-600',
									'bg-@gray-700',
									'bg-@gray-800',
									'bg-@gray-900',
									'bg-@gray-950',
								]}
							/>

							<ColorSwatchGroup
								name="blue"
								textInflectionPoint={600}
								colors={[
									'bg-@blue-50',
									'bg-@blue-100',
									'bg-@blue-200',
									'bg-@blue-300',
									'bg-@blue-400',
									'bg-@blue-500',
									'bg-@blue-600',
									'bg-@blue-700',
									'bg-@blue-800',
									'bg-@blue-900',
									'bg-@blue-950',
								]}
							/>

							<ColorSwatchGroup
								name="cyan"
								textInflectionPoint={600}
								colors={[
									'bg-@cyan-50',
									'bg-@cyan-100',
									'bg-@cyan-200',
									'bg-@cyan-300',
									'bg-@cyan-400',
									'bg-@cyan-500',
									'bg-@cyan-600',
									'bg-@cyan-700',
									'bg-@cyan-800',
									'bg-@cyan-900',
									'bg-@cyan-950',
								]}
							/>

							<ColorSwatchGroup
								name="teal"
								textInflectionPoint={600}
								colors={[
									'bg-@teal-50',
									'bg-@teal-100',
									'bg-@teal-200',
									'bg-@teal-300',
									'bg-@teal-400',
									'bg-@teal-500',
									'bg-@teal-600',
									'bg-@teal-700',
									'bg-@teal-800',
									'bg-@teal-900',
									'bg-@teal-950',
								]}
							/>

							<ColorSwatchGroup
								name="green"
								textInflectionPoint={700}
								colors={[
									'bg-@green-50',
									'bg-@green-100',
									'bg-@green-200',
									'bg-@green-300',
									'bg-@green-400',
									'bg-@green-500',
									'bg-@green-600',
									'bg-@green-700',
									'bg-@green-800',
									'bg-@green-900',
									'bg-@green-950',
								]}
							/>

							<ColorSwatchGroup
								name="red"
								textInflectionPoint={600}
								colors={[
									'bg-@red-50',
									'bg-@red-100',
									'bg-@red-200',
									'bg-@red-300',
									'bg-@red-400',
									'bg-@red-500',
									'bg-@red-600',
									'bg-@red-700',
									'bg-@red-800',
									'bg-@red-900',
									'bg-@red-950',
								]}
							/>

							<ColorSwatchGroup
								name="orange"
								textInflectionPoint={700}
								colors={[
									'bg-@orange-50',
									'bg-@orange-100',
									'bg-@orange-200',
									'bg-@orange-300',
									'bg-@orange-400',
									'bg-@orange-500',
									'bg-@orange-600',
									'bg-@orange-700',
									'bg-@orange-800',
									'bg-@orange-900',
									'bg-@orange-950',
								]}
							/>

							<ColorSwatchGroup
								name="yellow"
								textInflectionPoint={700}
								colors={[
									'bg-@yellow-50',
									'bg-@yellow-100',
									'bg-@yellow-200',
									'bg-@yellow-300',
									'bg-@yellow-400',
									'bg-@yellow-500',
									'bg-@yellow-600',
									'bg-@yellow-700',
									'bg-@yellow-800',
									'bg-@yellow-900',
									'bg-@yellow-950',
								]}
							/>

							<ColorSwatchGroup
								name="purple"
								textInflectionPoint={700}
								colors={[
									'bg-@purple-50',
									'bg-@purple-100',
									'bg-@purple-200',
									'bg-@purple-300',
									'bg-@purple-400',
									'bg-@purple-500',
									'bg-@purple-600',
									'bg-@purple-700',
									'bg-@purple-800',
									'bg-@purple-900',
									'bg-@purple-950',
								]}
							/>

							<ColorSwatchGroup
								name="pink"
								textInflectionPoint={700}
								colors={[
									'bg-@pink-50',
									'bg-@pink-100',
									'bg-@pink-200',
									'bg-@pink-300',
									'bg-@pink-400',
									'bg-@pink-500',
									'bg-@pink-600',
									'bg-@pink-700',
									'bg-@pink-800',
									'bg-@pink-900',
									'bg-@pink-950',
								]}
							/>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-1">
				<h2 className="text-@h5">alias</h2>

				<Card>
					<CardContent>
						<div className="space-y-4">
							<p>
								Alias color tokens are used to reference a base color token. However, they carry a{' '}
								<i>semantic</i> meaning. It is expected that an alias token's shade will vary from
								theme to theme.
							</p>

							<div className="space-y-2">
								<h3 className="text-@h6">background (bg)</h3>

								<p>`background` colors should be used for backgrounds.</p>
								<ul>
									<li className="border-2 border-@border-default">
										<div className="bg-@bg-default p-6">
											<h4 className="text-@fg-default text-@h6">@bg-default</h4>
										</div>
									</li>

									<li className="border-2 border-@border-default">
										<div className="bg-@bg-muted p-6">
											<h4 className="text-@fg-default text-@h6">@bg-muted</h4>
										</div>
									</li>

									<li className="border-2 border-@border-default">
										<div className="bg-black dark:bg-white p-6">
											<h4 className="text-white dark:text-black text-@h6">@bg-emphasis</h4>
										</div>
									</li>
								</ul>
							</div>

							<div className="space-y-2">
								<h3 className="text-@h6">foreground (fg)</h3>

								<p>`foreground` colors should be used for text placed on top of backgrounds.</p>
								<ul>
									<li className="border-2 border-@border-default">
										<div className="bg-@bg-default p-6">
											<h4 className="text-@fg-default text-@h6">@fg-default</h4>
										</div>
									</li>

									<li className="border-2 border-@border-default">
										<div className="bg-@bg-default p-6">
											<h4 className="text-@fg-muted text-@h6">@fg-muted</h4>
										</div>
									</li>

									<li className="border-2 border-@border-default">
										<div className="bg-black dark:bg-white p-6">
											<h4 className="text-white dark:text-black text-@h6">@fg-on-emphasis</h4>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-1">
				<h2 className="text-@h5">component</h2>

				<Card>
					<CardContent>
						<div className="space-y-4">
							<p>
								Component color tokens are tokens that are specific to a single design system
								component. They should not be used outside of their component. They can reference
								either an alias or a base token, and the actual shade may vary from theme to theme.
							</p>

							<p>
								At this point in time no color tokens exist, but the idea is baked into the design
								system for completeness.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}

function ColorSwatchGroup({
	name,
	colors,
	textInflectionPoint,
}: {
	name: string;
	colors: string[];
	textInflectionPoint: number;
}) {
	return (
		<div className="space-y-2">
			<h2 className="text-@h5">{name}</h2>
			<ul className="flex flex-wrap gap-2">
				{colors.map((bg) => {
					const shade = bg.split('-').at(-1);
					return (
						<li key={bg}>
							<div
								className={cn(
									'h-10 w-10 border border-@border-default flex items-center justify-center',
									bg,
									Number(shade) >= textInflectionPoint ? 'text-white' : 'text-black'
								)}
							>
								<div className="text-@h6">{shade}</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
