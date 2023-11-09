import { cn } from '@/lib/cn';
import Link from 'next/link';
import '../globals.css';

export const metadata = {
	title: 'Benjamin Johnson (Internal)',
	description: '',
	icons: {
		icon: '/favicon.svg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
