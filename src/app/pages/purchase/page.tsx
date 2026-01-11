'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddressForm from '@/src/components/profile/AddressForm';
import CheckoutForm from '@/src/components/purchase/CheckoutForm';
import { useCart } from '@/src/context/CartContext';
import { PREDEFINED_CITIES } from '@/src/data/cities';
import { supabase } from '@/src/lib/supabase';
import type { Address } from '@/src/types/address';
import type { User } from '@/src/types/user';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function PurchasePage() {
	const [clientSecret, setClientSecret] = useState('');
	const { items, totalPrice } = useCart();
	const [user, setUser] = useState<User | null>(null);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [loadingUser, setLoadingUser] = useState(true);
	const router = useRouter();

	const freight = selectedAddress
		? PREDEFINED_CITIES.find((c) => c.name === selectedAddress.city)?.freight ||
			0
		: 0;
	const totalWithFreight = totalPrice + freight;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				if (!session) {
					router.push('/pages/login');
					return;
				}

				const response = await fetch('/api/user', {
					headers: { Authorization: `Bearer ${session.access_token}` },
				});

				if (response.ok) {
					const userData = await response.json();
					setUser(userData);
					if (userData.addresses && userData.addresses.length > 0) {
						setSelectedAddress(userData.addresses[0]);
					} else {
						setShowAddressForm(true);
					}
				}
			} catch (error) {
				console.error('Error fetching user:', error);
			} finally {
				setLoadingUser(false);
			}
		};

		fetchUser();
	}, [router]);

	useEffect(() => {
		if (items.length === 0 || !selectedAddress) return;

		fetch('/api/payment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items, cityName: selectedAddress.city }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [items, selectedAddress]);

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

	if (loadingUser) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C5F2D]" />
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
							<div className="text-gray-600 text-center mb-4 w-full">
								<div className="flex justify-between text-sm">
									<span>Subtotal:</span>
									<span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Frete:</span>
									<span>R$ {freight.toFixed(2).replace('.', ',')}</span>
								</div>
								<div className="flex justify-between font-bold text-[#3C5F2D] text-lg mt-2 pt-2 border-t">
									<span>Total:</span>
									<span>
										R$ {totalWithFreight.toFixed(2).replace('.', ',')}
									</span>
								</div>
							</div>
						)}
					</div>

					{items.length === 0 ? (
						<div className="text-center text-gray-500">
							Seu carrinho está vazio.
						</div>
					) : showAddressForm ? (
						<div className="mb-6">
							<h2 className="text-lg font-bold text-[#3C5F2D] mb-4">
								Cadastrar Endereço de Entrega
							</h2>
							<AddressForm
								onSuccess={async () => {
									setShowAddressForm(false);
									try {
										const {
											data: { session },
										} = await supabase.auth.getSession();
										if (session) {
											const response = await fetch('/api/user', {
												headers: {
													Authorization: `Bearer ${session.access_token}`,
												},
											});
											if (response.ok) {
												const userData = await response.json();
												setUser(userData);
												if (
													userData.addresses &&
													userData.addresses.length > 0
												) {
													setSelectedAddress(userData.addresses[0]);
												}
											}
										}
									} catch (e) {
										console.error(e);
									}
								}}
								onCancel={() => {
									if (user?.addresses?.length) {
										setShowAddressForm(false);
									}
								}}
							/>
						</div>
					) : (
						<div className="mb-6 space-y-4">
							<div className="p-4 border-2 border-[#3C5F2D] rounded-2xl bg-[#f7faf5]">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-sm font-bold text-[#3C5F2D] mb-1">
											Entregar em:
										</h3>
										{selectedAddress ? (
											<div className="text-sm text-gray-700">
												<p>
													{selectedAddress.street}, {selectedAddress.number}
												</p>
												<p>{selectedAddress.neighborhood}</p>
												<p>
													{selectedAddress.city} - {selectedAddress.state}
												</p>
												<p>{selectedAddress.zipCode}</p>
											</div>
										) : (
											<p className="text-sm text-gray-500">
												Selecione um endereço
											</p>
										)}
									</div>
									<button
										type="button"
										onClick={() => setShowAddressForm(true)}
										className="text-xs text-[#3C5F2D] font-bold underline hover:text-[#2d4722]"
									>
										Trocar
									</button>
								</div>
							</div>

							{clientSecret && selectedAddress && (
								<Elements options={options} stripe={stripePromise}>
									<CheckoutForm />
								</Elements>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
