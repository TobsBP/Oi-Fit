import { z } from 'zod';

export const orderSchema = z.object({
	id: z.string(),
	userId: z.string(),
	status: z.enum([
		'PENDING',
		'PAID',
		'SHIPPED',
		'DELIVERED',
		'CANCELED',
		'RETURNED',
	]),
	totalPrice: z.number(),
	shippingAddress: z.any(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Order = z.infer<typeof orderSchema>;
