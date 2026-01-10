import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(
	req: Request,
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

		return NextResponse.json(user);
	} catch (error) {
		console.error('Internal Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
