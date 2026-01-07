import Link from 'next/link';
import ProductDetails from '@/src/components/products/ProductDetails';
import { products } from '@/src/data/products';

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = products.find((p) => p.id === parseInt(id, 10));

	if (!product) {
		return (
			<div className="min-h-screen text-black p-6 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
				<Link href="/pages/products" className="text-blue-600 hover:underline">
					Voltar para produtos
				</Link>
			</div>
		);
	}

	return <ProductDetails product={product} />;
}
