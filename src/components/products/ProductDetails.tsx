'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AddToCartButton from '@/src/components/products/AddToCartButton';

interface Product {
	id: string;
	name: string;
	price: number;
	discount: number;
	category: string;
	size: string;
	stock: number;
	showStock: boolean;
	images: string[];
	description: string;
	isActive: boolean;
}

export default function ProductDetails({ product }: { product: Product }) {
	const images =
		product.images && product.images.length > 0
			? product.images
			: ['/Logo.jpg'];
	const [selectedImage, setSelectedImage] = useState(images[0] || '/Logo.jpg');

	const isOutOfStock = product.stock === 0;

	const discountedPrice =
		product.discount > 0 ? product.price * (1 - product.discount / 100) : null;

	return (
		<div className="min-h-screen text-black p-6 pt-28">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
					<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
						{/* Image Gallery Section */}
						<div className="space-y-4">
							<div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
								<Image
									src={selectedImage}
									alt={product.name}
									fill
									className={`object-cover transition-all duration-300 ${isOutOfStock ? 'grayscale' : ''}`}
									sizes="(max-width: 768px) 100vw, 50vw"
									priority
								/>
								{isOutOfStock && (
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
										<span className="bg-red-600 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-lg shadow-xl">
											Esgotado
										</span>
									</div>
								)}
							</div>

							{/* Thumbnails */}
							{images.length > 1 && (
								<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
									{images.map((img, index) => (
										<button
											type="button"
											key={img}
											onClick={() => setSelectedImage(img)}
											className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
												selectedImage === img
													? 'border-[#3C5F2D] ring-2 ring-[#3C5F2D]/30 opacity-100 scale-105'
													: 'border-transparent opacity-70 hover:opacity-100'
											}`}
										>
											<Image
												src={img}
												alt={`View ${index + 1}`}
												fill
												className="object-cover"
												sizes="80px"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Product Info Section */}
						<div className="flex flex-col justify-center">
							<div className="mb-2">
								<span className="text-sm font-bold tracking-wider text-[#3C5F2D] uppercase bg-[#3C5F2D]/10 px-3 py-1 rounded-full">
									{product.category}
								</span>
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
								{product.name}
							</h1>

							<div className="flex flex-col mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
								<div className="flex flex-col mb-2">
									{discountedPrice && (
										<span className="text-xl text-gray-400 line-through">
											R$ {product.price.toFixed(2)}
										</span>
									)}
									<p className="text-4xl font-bold text-[#3C5F2D]">
										R${' '}
										{discountedPrice
											? discountedPrice.toFixed(2)
											: product.price.toFixed(2)}
									</p>
								</div>

								{/* Stock Display */}
								{product.stock > 0 ? (
									product.showStock && (
										<div className="flex items-center gap-2 text-green-600 font-medium text-sm">
											<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
											Em estoque: {product.stock} unidades
										</div>
									)
								) : (
									<p className="text-sm text-red-600 font-bold uppercase flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-red-600"></span>
										Produto Esgotado
									</p>
								)}
							</div>

							{/* Size Display */}
							{product.size && (
								<div className="mb-8">
									<h3 className="text-sm font-bold text-gray-900 mb-3">
										Tamanho
									</h3>
									<span className="inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 border-[#3C5F2D] bg-[#3C5F2D] text-white font-bold shadow-lg">
										{product.size}
									</span>
								</div>
							)}

							<div className="prose max-w-none text-gray-600 mb-10 leading-relaxed">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Descrição
								</h3>
								<p>{product.description}</p>
							</div>

							<div className="mt-auto space-y-4">
								{!isOutOfStock ? (
									<AddToCartButton
										product={product}
										className="shadow-xl shadow-[#3C5F2D]/20 transform hover:-translate-y-1"
										selectedSize={product.size}
									/>
								) : (
									<button
										type="button"
										disabled
										className="w-full bg-gray-200 text-gray-400 py-4 rounded-xl text-lg font-bold cursor-not-allowed border-2 border-gray-200"
									>
										Indisponível no momento
									</button>
								)}

								<div className="grid grid-cols-2 gap-4 pt-4">
									<Link
										href="/pages/products"
										className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-center text-sm"
									>
										← Continuar Comprando
									</Link>
									<Link
										href={`/pages/products?category=${product.category}`}
										className="flex items-center justify-center px-4 py-3 bg-white border-2 border-[#3C5F2D]/20 text-[#3C5F2D] rounded-xl hover:bg-[#3C5F2D]/5 transition-all font-medium text-center text-sm"
									>
										Ver mais {product.category}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
