'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PurchasePage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] flex items-center justify-center p-4 relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-96 h-96 bg-[#3C5F2D] rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
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

						<h1 className="text-2xl font-bold text-[#3C5F2D] mb-4">
							Pedido Enviado!
						</h1>
						<p className="text-gray-600 mb-8">
							Seu pedido foi enviado pelo WhatsApp. Aguarde a confirmação.
						</p>

						<Link
							href="/pages/products"
							className="block w-full bg-[#3C5F2D] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#2a4420] transition-colors text-center shadow-lg"
						>
							Continuar Comprando
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
