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

export const userListItemSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	phone: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type UserListItem = z.infer<typeof userListItemSchema>;

export const userUpdateSchema = z.object({
	name: z.string().min(2).max(100).optional(),
	email: z.email().optional(),
	phone: z.string().min(10).max(15).optional(),
});

export type UserUpdate = z.infer<typeof userUpdateSchema>;

export const userFormDataSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
});

export type UserFormData = z.infer<typeof userFormDataSchema>;
