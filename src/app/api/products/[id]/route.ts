import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		await prisma.product.delete({
			where: { id },
		});

		return NextResponse.json({ message: 'Product deleted successfully' });
	} catch (error) {
		console.error('Error deleting product:', error);
		return NextResponse.json(
			{ error: 'Error deleting product' },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await req.json();
		const { name, price, category, images, description, variants } = body;

		// 1. Find or create the category
		let categoryRecord = await prisma.category.findFirst({
			where: { name: category },
		});

		if (!categoryRecord) {
			categoryRecord = await prisma.category.create({
				data: { name: category },
			});
		}

		// 2. Update the product
		// For variants, it's complex to update. A simple strategy is to delete all and recreate.
		// NOTE: This will change variant IDs which might affect orders if not careful (though orders usually snapshot data).
		// Better approach: update existing ones, create new ones, delete removed ones.
		// For simplicity in this iteration: delete all variants and recreate.

		// First, delete existing variants
		await prisma.variant.deleteMany({
			where: { productId: id },
		});

		const product = await prisma.product.update({
			where: { id },
			data: {
				name,
				description,
				price,
				categoryId: categoryRecord.id,
				variants: {
					create: variants.map(
						(v: {
							size: string;
							color: string;
							stock: number;
							images?: string[];
						}) => ({
							size: v.size,
							color: v.color,
							stock: v.stock,
							images: images || [],
						}),
					),
				},
			},
			include: {
				variants: true,
				category: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('Error updating product:', error);
		return NextResponse.json(
			{ error: 'Error updating product' },
			{ status: 500 },
		);
	}
}
