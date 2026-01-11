import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { supabase } from '@/src/lib/supabase';

const createAddressSchema = z.object({
	street: z.string().min(1, 'Rua é obrigatória'),
	number: z.string().min(1, 'Número é obrigatório'),
	complement: z.string().optional(),
	neighborhood: z.string().min(1, 'Bairro é obrigatório'),
	city: z.string().min(1, 'Cidade é obrigatória'),
	state: z
		.string()
		.min(2, 'Estado é obrigatório')
		.max(2, 'Use a sigla do estado'),
	zipCode: z.string().min(8, 'CEP inválido'),
	country: z.string().default('BR'),
});

export async function POST(req: Request) {
	try {
		const authHeader = req.headers.get('Authorization');
		const token = authHeader?.split(' ')[1];

		if (!token) {
			return NextResponse.json(
				{ error: 'Missing authorization token' },
				{ status: 401 },
			);
		}

		const {
			data: { user: supabaseUser },
			error,
		} = await supabase.auth.getUser(token);

		if (error || !supabaseUser) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await req.json();
		const validationResult = createAddressSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{ error: 'Dados inválidos', details: validationResult.error },
				{ status: 400 },
			);
		}

		const {
			street,
			number,
			complement,
			neighborhood,
			city,
			state,
			zipCode,
			country,
		} = validationResult.data;

		const address = await prisma.address.create({
			data: {
				userId: supabaseUser.id,
				street,
				number,
				complement,
				neighborhood,
				city,
				state,
				zipCode,
				country,
			},
		});

		return NextResponse.json(address, { status: 201 });
	} catch (error) {
		console.error('Error creating address:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
