import { z } from 'zod';
import { addressSchema } from './address';
import { orderSchema } from './order';

export const userSchema = z.object({
	id: z.string(),
	email: z.email('Email inválido'),
	phone: z.string().min(10).max(15).nullable(),
	name: z.string().min(2).max(100).nullable(),
	addresses: z.array(addressSchema).default([]),
	orders: z.array(orderSchema).default([]),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
