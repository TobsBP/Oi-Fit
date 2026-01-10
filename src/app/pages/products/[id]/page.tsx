import Link from 'next/link';
import ProductDetails from '@/src/components/products/ProductDetails';
import prisma from '@/src/lib/prisma';

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	// Fetch product directly from DB since this is a server component
	const productData = await prisma.product.findUnique({
		where: { id },
		include: {
			variants: true,
			category: true,
		},
	});

	if (!productData) {
		return (
			<div className="min-h-screen text-black p-6 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
				<Link href="/pages/products" className="text-blue-600 hover:underline">
					Voltar para produtos
				</Link>
			</div>
		);
	}

	// Transform data to match ProductDetails expected interface
	// We need to check what ProductDetails expects.
	// Based on previous files, it seems to expect:
	// interface Product {
	// 	id: string | number;
	// 	name: string;
	// 	price: number;
	// 	originalPrice?: number;
	// 	category: string;
	// 	image: string;
	// 	images: string[];
	// 	description: string;
	// 	stock: number;
	// 	variants: ProductVariant[];
	// }

	const images =
		productData.variants.length > 0 && productData.variants[0].images.length > 0
			? productData.variants[0].images
			: ['/Logo.jpg'];

	const product = {
		id: productData.id,
		name: productData.name,
		price: Number(productData.price),
		originalPrice: 0,
		category: productData.category?.name || '',
		description: productData.description || '',
		stock: productData.variants.reduce((acc, v) => acc + v.stock, 0),
		variants: productData.variants.map((v) => ({
			size: v.size,
			color: v.color,
			stock: v.stock,
		})),
		image: images[0],
		images: images,
	};

	return <ProductDetails product={product} />;
}
