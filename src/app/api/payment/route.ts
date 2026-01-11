import { NextResponse } from 'next/server';
import { PREDEFINED_CITIES } from '@/src/data/cities';
import prisma from '@/src/lib/prisma';
import { stripe } from '@/src/lib/stripe';

const calculateOrderAmount = async (
	items: { product: { id: string }; quantity: number }[],
	cityName?: string,
) => {
	const productIds = items.map((item) => item.product.id);

	const dbProducts = await prisma.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});

	const itemsTotal = items.reduce((acc, item) => {
		const product = dbProducts.find((p) => p.id === item.product.id);
		if (!product) {
			return acc;
		}
		// Prisma Decimal to number
		return acc + Number(product.price) * item.quantity;
	}, 0);

	const city = PREDEFINED_CITIES.find((c) => c.name === cityName);
	const freight = city ? city.freight : 0;

	// Stripe expects amount in cents
	return Math.round((itemsTotal + freight) * 100);
};

export async function POST(req: Request) {
	try {
		const { items, cityName } = await req.json();

		if (!items || items.length === 0) {
			return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
		}

		const amount = await calculateOrderAmount(items, cityName);

		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
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
