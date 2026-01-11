import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { supabase } from '@/src/lib/supabase';

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
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

		// Verify address belongs to user
		const address = await prisma.address.findUnique({
			where: { id },
		});

		if (!address) {
			return NextResponse.json({ error: 'Address not found' }, { status: 404 });
		}

		if (address.userId !== supabaseUser.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		await prisma.address.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting address:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
