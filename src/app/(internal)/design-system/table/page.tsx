import { Card, CardContent } from '../_components/card';

import { Table } from '../_components/table';

const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card',
	},
];

export default async function CardsPage() {
	return (
		<div className="w-full h-full bg-@bg-default text-@fg-default">
			<div className="max-w-screen-md sm:px-8 mx-0 sm:mx-auto pt-8 sm:py-8">
				<h1 className="text-@h5">table</h1>

				<div className="space-y-12 pt-8">
					<section className="space-y-1">
						<h2 className="text-@h5">default</h2>
						<Card>
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head className="w-[100px]">Invoice</Table.Head>
										<Table.Head>Status</Table.Head>
										<Table.Head>Method</Table.Head>
										<Table.Head className="text-right">Amount</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{invoices.map((invoice) => (
										<Table.Row key={invoice.invoice}>
											<Table.Cell>{invoice.invoice}</Table.Cell>
											<Table.Cell>{invoice.paymentStatus}</Table.Cell>
											<Table.Cell>{invoice.paymentMethod}</Table.Cell>
											<Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.Cell colSpan={3}>Total</Table.Cell>
										<Table.Cell className="text-right">$2,500.00</Table.Cell>
									</Table.Row>
								</Table.Footer>
							</Table.Root>
						</Card>
					</section>
				</div>
			</div>
		</div>
	);
}
