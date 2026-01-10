import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import type { Order } from '@/src/types/order';

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 },
			);
		}

		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				addresses: true,
				orders: {
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({
			...user,
			orders: user.orders.map((order: Order) => ({
				...order,
				totalPrice: Number(order.totalPrice),
			})),
		});
	} catch (error) {
		console.error('Internal Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
