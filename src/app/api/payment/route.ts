import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PREDEFINED_CITIES } from '@/src/data/cities';
import { stripe } from '@/src/lib/stripe';

const paymentBodySchema = z.object({
	items: z.array(
		z.object({
			price: z.number().positive(),
			quantity: z.number().int().positive(),
		}),
	),
	cityName: z.string(),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { items, cityName } = paymentBodySchema.parse(body);

		const subtotal = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);

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
