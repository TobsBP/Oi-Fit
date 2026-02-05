import { z } from 'zod';

export const paymentCartItemSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	quantity: z.number(),
});

export type PaymentCartItem = z.infer<typeof paymentCartItemSchema>;
