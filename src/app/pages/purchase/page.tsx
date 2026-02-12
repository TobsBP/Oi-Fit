'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/src/context/CartContext';

const WHATSAPP_NUMBER = '553598985318';

export default function PurchasePage() {
	const { items, totalPrice } = useCart();
	const router = useRouter();

	useEffect(() => {
		if (items.length === 0) return;

		const lines = items.map(({ product, quantity, size, color }) => {
			let line = `- ${product.name} (x${quantity}) — R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}`;
			if (size) line += ` | Tam: ${size}`;
			if (color) line += ` | Cor: ${color}`;
			return line;
		});
		const message = [
			'Olá! Gostaria de fazer um pedido:',
			'',
			...lines,
			'',
			`*Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}*`,
		].join('\n');

		window.open(
			`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
			'_blank',
		);
	}, [items, totalPrice]);

	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] flex items-center justify-center p-4 relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-96 h-96 bg-[#3C5F2D] rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 transform transition-transform duration-300">
					<div className="flex flex-col items-center text-center">
						<div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#3C5F2D] ring-offset-4 mb-6">
							<Image
								src="/Logo.jpg"
								alt="Oi-Fit Logo"
								fill
								className="object-cover"
								priority
							/>
						</div>

						{items.length === 0 ? (
							<>
								<h1 className="text-2xl font-bold text-[#3C5F2D] mb-4">
									Seu carrinho está vazio
								</h1>
								<Link
									href="/pages/products"
									className="block w-full bg-[#3C5F2D] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#2a4420] transition-colors text-center shadow-lg"
								>
									Ver Produtos
								</Link>
							</>
						) : (
							<>
								<h1 className="text-2xl font-bold text-[#3C5F2D] mb-4">
									Redirecionando para o WhatsApp...
								</h1>
								<p className="text-gray-600 mb-6">
									Você será redirecionado para uma conversa no WhatsApp para
									finalizar seu pedido.
								</p>
								<a
									href={(() => {
										const lines = items.map(
											({ product, quantity, size, color }) => {
												let line = `- ${product.name} (x${quantity}) — R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}`;
												if (size) line += ` | Tam: ${size}`;
												if (color) line += ` | Cor: ${color}`;
												return line;
											},
										);
										const message = [
											'Olá! Gostaria de fazer um pedido:',
											'',
											...lines,
											'',
											`*Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}*`,
										].join('\n');
										return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
									})()}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1da851] transition-colors text-center shadow-lg mb-3"
								>
									Abrir WhatsApp
								</a>
								<button
									type="button"
									onClick={() => router.back()}
									className="text-[#3C5F2D] font-semibold hover:underline"
								>
									Voltar
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
