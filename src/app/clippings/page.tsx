import { readFile } from '@/lib/read-file';
import { PageWrapper } from '../_components/page-wrapper';
import { Tag } from '@/lib/tag';
import { A } from '@/lib/a';

export default async function ClippingsRoute() {
	const raw = await readFile('clippings.json', 'json');
	const clippings = JSON.parse(raw);

	return (
		<PageWrapper
			title="Clippings"
			subtitle="Articles, blogs, and other links I've found interesting."
		>
			<div className="prose dark:prose-invert max-w-none">
				<table>
					<thead>
						<tr className="font-bold text-lg">
							<td>Link</td>
							<td>Tags</td>
						</tr>
					</thead>
					<tbody data-testid="Clippings__tablebody">
						{clippings.map((clipping: any, i: number) => (
							<tr key={i}>
								<td className="w-3/5">
									<A href={clipping.url}>{clipping.name}</A>
								</td>
								<td>
									<div className="flex gap-2 flex-wrap">
										{clipping.tags.map((tag: string) => (
											<Tag key={tag} variant="strong" tag={tag} />
										))}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</PageWrapper>
	);
}
