import { z } from 'zod';

export const loginShema = z.object({
	email: z.email('Email inválido'),
	name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
	email: z.email('Email inválido'),
	name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
	phone: z.string().min(10, 'O telefone deve ter no mínimo 10 dígitos'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type loginSchema = z.infer<typeof loginShema>;
export type registerSchema = z.infer<typeof registerSchema>;
