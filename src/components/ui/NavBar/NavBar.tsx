'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/src/context/CartContext';

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const { toggleCart, totalItems } = useCart();

	const menuItems = [
		{ href: '/', label: 'Início' },
		{ href: '/pages/login', label: 'Login' },
		{ href: '/pages/products', label: 'Produtos' },
		{ href: '/pages/products?category=Top', label: 'Tops' },
		{ href: '/pages/products?category=Calça', label: 'Calças' },
		{ href: '/pages/products?category=Short', label: 'Shorts' },
		{ href: '/pages/products?category=Conjunto', label: 'Conjuntos' },
		{ href: '/pages/products?category=Macacão', label: 'Macacão' },
		{ href: '/pages/products?category=Macaquinho', label: 'Macaquinho' },
		{ href: '/pages/about', label: 'Sobre' },
	];

	return (
		<>
			{/* Botão hambúrguer moderno */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="fixed top-6 left-6 z-50 p-3 border-2 border-white rounded-2xl bg-[#3C5F2D] text-white hover:bg-[#4a7338] transition-all duration-300"
				aria-label="Menu"
			>
				<div
					className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
				></div>
				<div
					className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
				></div>
				<div
					className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
				></div>
			</button>

			{/* Botão do Carrinho */}
			<button
				type="button"
				onClick={toggleCart}
				className="fixed top-6 right-6 z-40 p-3 border-2 border-white rounded-2xl bg-[#3C5F2D] text-white hover:bg-[#4a7338] transition-all duration-300 shadow-lg flex items-center gap-2"
				aria-label="Carrinho"
			>
				<div className="relative">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
					{totalItems > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#3C5F2D]">
							{totalItems}
						</span>
					)}
				</div>
				<span className="hidden sm:inline font-medium">Carrinho</span>
			</button>

			{/* Overlay com blur */}
			{isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
					}}
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 w-full h-full cursor-default"
					aria-label="Fechar menu"
				/>
			)}

			{/* Menu lateral moderno */}
			<nav
				className={`fixed top-0 left-0 h-full w-72 bg-[#3C5F2D] shadow-2xl z-40 transform transition-transform duration-300 ease-out ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Header do menu */}
				<div className="pt-20 px-8 pb-6 border-b border-white/20">
					<h2 className="text-white text-2xl font-bold">Menu</h2>
					<p className="text-[#a5c893] text-sm mt-1">Navegue pela loja</p>
				</div>

				{/* Lista de itens */}
				<div className="px-6 py-8">
					<ul className="space-y-2">
						{menuItems.map((item) => (
							<li key={item.label}>
								<Link
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="block px-4 py-3 text-white text-lg font-medium rounded-2xl hover:bg-[#a5c893] hover:text-black transition-all duration-200 transform hover:translate-x-2"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Footer do menu */}
				<div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
					<div className="text-center">
						<p className="text-[#a5c893] text-sm">
							© 2026 Oi Fit. Todos os direitos reservados.
						</p>
					</div>
				</div>
			</nav>
		</>
	);
}
