import type { PaymentCartItem } from '../types/payment';

export async function createPaymentIntent(
	items: PaymentCartItem[],
	cityName: string,
): Promise<string> {
	const response = await fetch('/api/payment', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ items, cityName }),
	});

	const data = await response.json();
	return data.clientSecret;
}
