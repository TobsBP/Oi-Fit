import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const category = searchParams.get('category');

		const where = category ? { category: { name: category } } : {};

		const products = await prisma.product.findMany({
			where,
			include: {
				variants: true,
				category: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		return NextResponse.json(
			{ error: 'Error fetching products' },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
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

		// 2. Create the product
		const product = await prisma.product.create({
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
							images: images || [], // Assign all images to each variant for now
						}),
					),
				},
			},
			include: {
				variants: true,
				category: true,
			},
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error) {
		console.error('Error creating product:', error);
		return NextResponse.json(
			{ error: 'Error creating product' },
			{ status: 500 },
		);
	}
}
