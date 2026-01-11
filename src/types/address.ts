import { z } from 'zod';

export const addressSchema = z.object({
	id: z.string(),
	userId: z.string(),
	street: z.string(),
	number: z.string(),
	complement: z.string().nullable(),
	neighborhood: z.string(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
	country: z.string(),
});

export type Address = z.infer<typeof addressSchema>;
