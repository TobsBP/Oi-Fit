import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { supabase } from '@/src/lib/supabase';
import type { Order } from '@/src/types/order';

export async function GET(req: Request) {
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

		const dbUser = await prisma.user.findUnique({
			where: { id: supabaseUser.id },
			include: {
				addresses: true,
				orders: {
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (dbUser) {
			return NextResponse.json({
				id: dbUser.id,
				email: dbUser.email,
				name: dbUser.name || supabaseUser.user_metadata.name || 'Usuário',
				phone: dbUser.phone || supabaseUser.user_metadata.phone || '',
				addresses: dbUser.addresses,
				orders: dbUser.orders.map((order: Order) => ({
					...order,
					totalPrice: Number(order.totalPrice),
				})),
			});
		}

		return NextResponse.json({
			id: supabaseUser.id,
			email: supabaseUser.email || '',
			name: supabaseUser.user_metadata.name || 'Usuário',
			phone: supabaseUser.user_metadata.phone || '',
			addresses: [],
			orders: [],
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
