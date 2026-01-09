import { NextResponse } from 'next/server';
import { products } from '@/src/data/products';
import { stripe } from '@/src/lib/stripe';

const calculateOrderAmount = (
	items: { product: { id: number }; quantity: number }[],
) => {
	const total = items.reduce((acc, item) => {
		const product = products.find((p) => p.id === item.product.id);
		if (!product) {
			return acc;
		}
		return acc + product.price * item.quantity;
	}, 0);

	// Stripe expects amount in cents
	return Math.round(total * 100);
};

export async function POST(req: Request) {
	try {
		const { items } = await req.json();

		if (!items || items.length === 0) {
			return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
		}

		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(items),
			currency: 'brl',
			payment_method_options: {
				card: {
					installments: {
						enabled: true,
					},
				},
			},
		});

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error('Internal Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
