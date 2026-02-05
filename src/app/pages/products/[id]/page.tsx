'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductDetails from '@/src/components/products/ProductDetails';
import { useProduct } from '@/src/hooks/useProducts';

export default function ProductPage() {
	const params = useParams();
	const id = params.id as string;
	const { product, isLoading, error } = useProduct(id);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-[#3C5F2D]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3C5F2D]"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500">
				<p>Erro ao carregar o produto: {error.message}</p>
			</div>
		);
	}

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
