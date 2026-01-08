'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/src/components/purchase/CheckoutForm';
import { useCart } from '@/src/context/CartContext';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function PurchasePage() {
	const [clientSecret, setClientSecret] = useState('');
	const { items, totalPrice } = useCart();

	useEffect(() => {
		if (items.length === 0) return;

		fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [items]);

	const appearance = {
		theme: 'stripe' as const,
		variables: {
			colorPrimary: '#3C5F2D',
		},
	};
	const options = {
		clientSecret,
		appearance,
	};

	if (!stripePromise) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
				Erro: Chave pública do Stripe não configurada.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] flex items-center justify-center p-4 relative overflow-hidden">
			{/* Elementos decorativos de fundo */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-96 h-96 bg-[#3C5F2D] rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
			</div>

			{/* Container principal */}
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 transform transition-transform duration-300">
					{/* Header com logo */}
					<div className="flex flex-col items-center mb-8">
						<div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#3C5F2D] ring-offset-4 mb-6">
							<Image
								src="/Logo.jpg"
								alt="Oi-Fit Logo"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<h1 className="text-3xl font-bold text-[#3C5F2D] mb-2">
							Finalizar Compra
						</h1>
						{items.length > 0 && (
							<p className="text-gray-600 text-center mb-4">
								Total a pagar:{' '}
								<span className="font-bold text-[#3C5F2D]">
									R$ {totalPrice.toFixed(2).replace('.', ',')}
								</span>
							</p>
						)}
					</div>

					{items.length === 0 ? (
						<div className="text-center text-gray-500">
							Seu carrinho está vazio.
						</div>
					) : (
						clientSecret && (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm />
							</Elements>
						)
					)}
				</div>
			</div>
		</div>
	);
}
