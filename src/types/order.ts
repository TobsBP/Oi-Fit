import { z } from 'zod';

export const orderSchema = z.object({
	id: z.string(),
	userId: z.string(),
	status: z.string(),
	totalPrice: z.number(),
	shippingAddress: z.any(),
	createdAt: z.string(),
	updatedAt: z.string(),
	quantity: z.number().optional(),
	productId: z.string().optional(),
	paymentIntentId: z.string().nullable().optional(),
});

export type Order = z.infer<typeof orderSchema>;
