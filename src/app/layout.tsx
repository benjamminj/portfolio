import { cn } from '@/lib/cn';
import { Inter } from 'next/font/google';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import './globals.css';
import Script from 'next/script';
import { Body } from './_components/body';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Benjamin Johnson',
	description: '',
	icons: {
		icon: '/favicon.svg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Body>
				<div className="relative">
					<div className="absolute inset-x-0 top-0">
						<Header />
					</div>
				</div>

				<main>{children}</main>

				<Footer />
			</Body>
		</html>
	);
}
