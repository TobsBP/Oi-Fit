import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import BackgroundFruits from '@/src/components/ui/BackgroundFruits';
import CartSidebar from '@/src/components/ui/Cart/CartSidebar';
import Footer from '@/src/components/ui/Footer/Footer';
import NavBar from '@/src/components/ui/NavBar/NavBar';
import { CartProvider } from '@/src/context/CartContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'OiFit',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CartProvider>
					<BackgroundFruits />
					<div className="relative z-10 flex flex-col min-h-screen">
						<NavBar />
						<CartSidebar />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</CartProvider>
			</body>
		</html>
	);
}
