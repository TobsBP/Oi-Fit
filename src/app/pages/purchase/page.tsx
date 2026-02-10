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
import { useCreateOrder } from '@/src/hooks/useOrders';
import { useCurrentUser } from '@/src/hooks/useUsers';
import type { Address } from '@/src/types/address';
import type { CartItem } from '@/src/types/cart';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function PurchasePage() {
	const [clientSecret, setClientSecret] = useState('');
	const { items, totalPrice } = useCart();
	const {
		user,
		isLoading: loadingUser,
		refetch: refetchUser,
	} = useCurrentUser();
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [showAddressList, setShowAddressList] = useState(false);
	const createOrderMutation = useCreateOrder();
	const router = useRouter();

	const freight = selectedAddress
		? PREDEFINED_CITIES.find((c) => c.name === selectedAddress.city)?.freight ||
			0
		: 0;
	const totalWithFreight = totalPrice + freight;

	useEffect(() => {
		if (!loadingUser && !user) {
			router.push('/pages/login');
			return;
		}

		if (user?.addresses && user.addresses.length > 0 && !selectedAddress) {
			setSelectedAddress(user.addresses[0]);
		} else if (user && (!user.addresses || user.addresses.length === 0)) {
			setShowAddressForm(true);
		}
	}, [user, loadingUser, router, selectedAddress]);

	useEffect(() => {
		if (items.length === 0 || !selectedAddress) return;

		const paymentItems = items.map((item: CartItem) => ({
			productId: String(item.product.id),
			name: item.product.name,
			price: item.product.price,
			quantity: item.quantity,
		}));

		createOrderMutation
			.mutateAsync({ items: paymentItems, cityName: selectedAddress.city })
			.then(setClientSecret)
			.catch(console.error);
	}, [items, selectedAddress, createOrderMutation.mutateAsync]);

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
									refetchUser();
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
										onClick={() => setShowAddressList(true)}
										className="text-xs text-[#3C5F2D] font-bold underline hover:text-[#2d4722]"
									>
										Trocar
									</button>
								</div>
							</div>

							{showAddressList && user?.addresses && (
								<div className="space-y-2">
									{user.addresses.map((addr) => (
										<button
											key={addr.id}
											type="button"
											onClick={() => {
												setSelectedAddress(addr);
												setShowAddressList(false);
											}}
											className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
												selectedAddress?.id === addr.id
													? 'border-[#3C5F2D] bg-[#f7faf5]'
													: 'border-gray-200 hover:border-[#3C5F2D]/50'
											}`}
										>
											<p className="text-sm font-medium text-gray-900">
												{addr.street}, {addr.number}
											</p>
											<p className="text-xs text-gray-500">
												{addr.neighborhood} - {addr.city}/{addr.state}
											</p>
										</button>
									))}
									<button
										type="button"
										onClick={() => {
											setShowAddressList(false);
											setShowAddressForm(true);
										}}
										className="w-full p-3 rounded-xl border-2 border-dashed border-gray-300 text-sm text-[#3C5F2D] font-medium hover:border-[#3C5F2D] transition-all"
									>
										+ Adicionar novo endereço
									</button>
								</div>
							)}

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
