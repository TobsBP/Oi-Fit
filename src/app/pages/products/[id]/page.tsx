import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/src/components/products/AddToCartButton';
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
			<div className="min-h-screen bg-[#a5c893] text-black p-6 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
				<Link href="/pages/products" className="text-blue-600 hover:underline">
					Voltar para produtos
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#a5c893] text-black p-6 pt-28">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-3xl p-8 shadow-lg">
					<div className="grid md:grid-cols-2 gap-8">
						<div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>

						<div className="flex flex-col justify-center">
							<h1 className="text-4xl font-bold mb-4">{product.name}</h1>
							<div className="flex flex-col mb-6">
								{product.originalPrice &&
									product.originalPrice > product.price && (
										<span className="text-lg text-gray-400 line-through mb-1">
											R$ {product.originalPrice.toFixed(2)}
										</span>
									)}
								<p className="text-3xl font-bold text-[#a5c893]">
									R$ {product.price.toFixed(2)}
								</p>
							</div>

							<div className="prose max-w-none text-gray-600 mb-8">
								<p>{product.description}</p>
							</div>

							<AddToCartButton product={product} />
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-row gap-4 justify-center">
					<Link
						href="/pages/products"
						className="flex-1 max-w-50 px-4 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg font-medium text-[#3C5F2D] text-center text-sm sm:text-base"
					>
						← Voltar
					</Link>
					<Link
						href={`/pages/products?category=${product.category}`}
						className="flex-1 max-w-50 px-4 py-3 bg-[#2d4722] text-white rounded-xl hover:bg-[#2d4722] transition-colors shadow-lg font-medium text-center text-sm sm:text-base"
					>
						Mais {product.category}
					</Link>
				</div>
			</div>
		</div>
	);
}
