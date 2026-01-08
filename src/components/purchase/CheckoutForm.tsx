import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import type React from 'react';
import { useEffect, useState } from 'react';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent?.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/purchase`,
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message || 'An unexpected error occurred.');
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'tabs' as const,
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit} className="w-full">
			<PaymentElement id="payment-element" options={paymentElementOptions} />
			<button
				type="submit"
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="mt-6 w-full bg-[#3C5F2D] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#2a4420] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
			>
				{' '}
				<span id="button-text">
					{isLoading ? 'Processando...' : 'Pagar Agora'}
				</span>
			</button>
			{message && (
				<div
					id="payment-message"
					className="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 p-2 rounded"
				>
					{message}
				</div>
			)}
		</form>
	);
}
