'use client';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useCart } from '@/src/context/CartContext';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

type PaymentStatus = 'loading' | 'succeeded' | 'processing' | 'failed';

const STATUS_CONFIG: Record<
	Exclude<PaymentStatus, 'loading'>,
	{ icon: string; title: string; description: string; color: string }
> = {
	succeeded: {
		icon: '✓',
		title: 'Pagamento Confirmado!',
		description:
			'Seu pedido foi recebido com sucesso. Você receberá um e-mail com os detalhes da compra.',
		color: '#3C5F2D',
	},
	processing: {
		icon: '⏳',
		title: 'Pagamento em Processamento',
		description:
			'Seu pagamento está sendo processado. Assim que for confirmado, você receberá uma notificação.',
		color: '#b08c1a',
	},
	failed: {
		icon: '✕',
		title: 'Pagamento não realizado',
		description:
			'Houve um problema com o pagamento. Por favor, tente novamente.',
		color: '#b91c1c',
	},
};

function PurchaseStatusContent() {
	const searchParams = useSearchParams();
	const { clearCart } = useCart();
	const [status, setStatus] = useState<PaymentStatus>('loading');
	const [cleared, setCleared] = useState(false);

	const redirectStatus = searchParams.get('redirect_status');
	const clientSecret = searchParams.get('payment_intent_client_secret');

	useEffect(() => {
		if (!stripePromise || !clientSecret) {
			if (redirectStatus === 'succeeded') {
				setStatus('succeeded');
			} else {
				setStatus('failed');
			}
			return;
		}

		stripePromise.then((stripe) => {
			if (!stripe) {
				setStatus('failed');
				return;
			}

			stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case 'succeeded':
						setStatus('succeeded');
						break;
					case 'processing':
						setStatus('processing');
						break;
					default:
						setStatus('failed');
						break;
				}
			});
		});
	}, [clientSecret, redirectStatus]);

	useEffect(() => {
		if ((status === 'succeeded' || status === 'processing') && !cleared) {
			clearCart();
			setCleared(true);
		}
	}, [status, cleared, clearCart]);

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C5F2D]" />
			</div>
		);
	}

	const config = STATUS_CONFIG[status];

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

						<div
							className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl font-bold text-white"
							style={{ backgroundColor: config.color }}
						>
							{config.icon}
						</div>

						<h1
							className="text-2xl md:text-3xl font-bold mb-3"
							style={{ color: config.color }}
						>
							{config.title}
						</h1>

						<p className="text-gray-600 mb-8 leading-relaxed">
							{config.description}
						</p>

						{status === 'succeeded' && (
							<div className="w-full mb-8">
								<div className="bg-[#f7faf5] border-2 border-[#3C5F2D]/20 rounded-2xl p-5">
									<h2 className="text-sm font-bold text-[#3C5F2D] mb-4">
										Status do Pedido
									</h2>
									<div className="flex items-center gap-3">
										{['Confirmado', 'Preparando', 'Enviado', 'Entregue'].map(
											(step, i) => (
												<div
													key={step}
													className="flex-1 flex flex-col items-center"
												>
													<div
														className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
															i === 0
																? 'bg-[#3C5F2D] text-white'
																: 'bg-gray-200 text-gray-400'
														}`}
													>
														{i + 1}
													</div>
													<span
														className={`text-[10px] leading-tight ${
															i === 0
																? 'text-[#3C5F2D] font-bold'
																: 'text-gray-400'
														}`}
													>
														{step}
													</span>
													{i < 3 && <div className="hidden" />}
												</div>
											),
										)}
									</div>
									<div className="flex mt-1 px-4">
										{[0, 1, 2].map((i) => (
											<div
												key={i}
												className={`flex-1 h-1 mx-0.5 rounded ${
													i < 0 ? 'bg-[#3C5F2D]' : 'bg-gray-200'
												}`}
											/>
										))}
									</div>
								</div>
							</div>
						)}

						{status === 'processing' && (
							<div className="w-full mb-8">
								<div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5">
									<p className="text-sm text-yellow-800">
										Assim que o pagamento for confirmado, o status do pedido
										será atualizado automaticamente.
									</p>
								</div>
							</div>
						)}

						<div className="w-full space-y-3">
							<Link
								href="/pages/products"
								className="block w-full bg-[#3C5F2D] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#2a4420] transition-colors text-center shadow-lg"
							>
								Continuar Comprando
							</Link>

							{status === 'failed' && (
								<Link
									href="/pages/purchase"
									className="block w-full bg-white text-[#3C5F2D] font-bold py-3 px-4 rounded-xl border-2 border-[#3C5F2D] hover:bg-[#f7faf5] transition-colors text-center"
								>
									Tentar Novamente
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function PurchaseSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C5F2D]" />
				</div>
			}
		>
			<PurchaseStatusContent />
		</Suspense>
	);
}
