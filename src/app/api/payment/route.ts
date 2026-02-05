import { NextResponse } from 'next/server';
import { PREDEFINED_CITIES } from '@/src/data/cities';
import { stripe } from '@/src/lib/stripe';

interface CartItem {
	product: {
		price: number;
		discount?: number;
	};
	quantity: number;
}

export async function POST(request: Request) {
	try {
		const { items, cityName } = await request.json();

		const subtotal = items.reduce((sum: number, item: CartItem) => {
			const price = item.product.price;
			const discount = item.product.discount || 0;
			const finalPrice = price - (price * discount) / 100;
			return sum + finalPrice * item.quantity;
		}, 0);

		const freight =
			PREDEFINED_CITIES.find((c) => c.name === cityName)?.freight || 0;

		const total = Math.round((subtotal + freight) * 100);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: 'brl',
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Payment error:', error);
		return NextResponse.json(
			{ error: 'Erro ao criar pagamento' },
			{ status: 500 },
		);
	}
}
