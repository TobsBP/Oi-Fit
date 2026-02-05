import { z } from 'zod';

export const productSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	discount: z.number(),
	category: z.string(),
	size: z.string(),
	stock: z.number(),
	images: z.array(z.string()),
	isActive: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const productCreateSchema = productSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const productUpdateSchema = productSchema;

export type Product = z.infer<typeof productSchema>;
export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
