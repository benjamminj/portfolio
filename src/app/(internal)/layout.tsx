import '../globals.css';
import { Body } from './_components/body';

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
			<Body>
				<main>{children}</main>
			</Body>
		</html>
	);
}
