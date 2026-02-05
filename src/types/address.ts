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

export const addressFormDataSchema = z.object({
	street: z.string(),
	number: z.string(),
	complement: z.string(),
	neighborhood: z.string(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
});

export type AddressFormData = z.infer<typeof addressFormDataSchema>;

export const cepDataSchema = z.object({
	logradouro: z.string(),
	bairro: z.string(),
	localidade: z.string(),
	uf: z.string(),
	erro: z.boolean().optional(),
});

export type CepData = z.infer<typeof cepDataSchema>;
