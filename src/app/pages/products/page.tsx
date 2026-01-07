'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { products } from '@/src/data/products';

function ProductsContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get('category');
	const filterCategory = categoryParam || 'all';

	const [sortOrder, setSortOrder] = useState('default');
	const [currentPage, setCurrentPage] = useState(1);
	const [showSortMenu, setShowSortMenu] = useState(false);
	const [showFilterMenu, setShowFilterMenu] = useState(false);
	const itemsPerPage = 12;

	const categories = [
		'all',
		'Top',
		'Calça',
		'Short',
		'Conjunto',
		'Macacão',
		'Macaquinho',
	];

	const filteredProducts = products.filter(
		(product) =>
			filterCategory === 'all' || product.category === filterCategory,
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortOrder === 'price-asc') return a.price - b.price;
		if (sortOrder === 'price-desc') return b.price - a.price;
		if (sortOrder === 'name') return a.name.localeCompare(b.name);
		return 0;
	});

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
	const currentProducts = sortedProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const getSortLabel = () => {
		if (sortOrder === 'price-asc') return 'Preço: Menor';
		if (sortOrder === 'price-desc') return 'Preço: Maior';
		if (sortOrder === 'name') return 'Nome A-Z';
		return 'Ordenar';
	};

	const handleFilterChange = (category: string) => {
		setCurrentPage(1);
		setShowFilterMenu(false);
		if (category === 'all') {
			router.push('/pages/products');
		} else {
			router.push(`/pages/products?category=${category}`);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] to-[#8fb377] text-black">
			<div className="max-w-7xl mx-auto p-6 md:p-8 pt-20 md:pt-20">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-[#3C5F2D] mb-2">
						Produtos
					</h1>
				</div>

				{/* Controles de filtro e ordenação */}
				<div className="flex flex-wrap gap-4 mb-8">
					{/* Botão de Ordenação */}
					<div className="relative">
						<button
							type="button"
							onClick={() => {
								setShowSortMenu(!showSortMenu);
								setShowFilterMenu(false);
							}}
							className="px-6 py-3 bg-white text-black font-medium rounded-2xl border-2 border-[#3C5F2D] hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
								/>
							</svg>
							{getSortLabel()}
						</button>

						{showSortMenu && (
							<div className="absolute top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#3C5F2D] overflow-hidden z-10 min-w-50">
								<button
									type="button"
									onClick={() => {
										setSortOrder('default');
										setCurrentPage(1);
										setShowSortMenu(false);
									}}
									className="w-full px-6 py-3 text-left hover:bg-[#a5c893] transition-colors"
								>
									Padrão
								</button>
								<button
									type="button"
									onClick={() => {
										setSortOrder('price-asc');
										setCurrentPage(1);
										setShowSortMenu(false);
									}}
									className="w-full px-6 py-3 text-left hover:bg-[#a5c893] transition-colors"
								>
									Preço: Menor ao Maior
								</button>
								<button
									type="button"
									onClick={() => {
										setSortOrder('price-desc');
										setCurrentPage(1);
										setShowSortMenu(false);
									}}
									className="w-full px-6 py-3 text-left hover:bg-[#a5c893] transition-colors"
								>
									Preço: Maior ao Menor
								</button>
								<button
									type="button"
									onClick={() => {
										setSortOrder('name');
										setCurrentPage(1);
										setShowSortMenu(false);
									}}
									className="w-full px-6 py-3 text-left hover:bg-[#a5c893] transition-colors"
								>
									Nome (A-Z)
								</button>
							</div>
						)}
					</div>

					{/* Botão de Filtro */}
					<div className="relative">
						<button
							type="button"
							onClick={() => {
								setShowFilterMenu(!showFilterMenu);
								setShowSortMenu(false);
							}}
							className="px-6 py-3 bg-white text-black font-medium rounded-2xl border-2 border-[#3C5F2D] hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
								/>
							</svg>
							Filtrar
							{filterCategory !== 'all' && (
								<span className="ml-1 px-2 py-0.5 bg-[#3C5F2D] text-white text-xs rounded-full">
									1
								</span>
							)}
						</button>

						{showFilterMenu && (
							<div className="absolute top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#3C5F2D] overflow-hidden z-10 min-w-50">
								{categories.map((cat) => (
									<button
										type="button"
										key={cat}
										onClick={() => handleFilterChange(cat)}
										className={`w-full px-6 py-3 text-left hover:bg-[#a5c893] transition-colors ${
											filterCategory === cat ? 'bg-[#a5c893] font-semibold' : ''
										}`}
									>
										{cat === 'all'
											? 'Todos'
											: cat.charAt(0).toUpperCase() + cat.slice(1)}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Badge de filtro ativo */}
					{filterCategory !== 'all' && (
						<div className="flex items-center gap-2 px-4 py-3 bg-[#3C5F2D] text-white rounded-2xl">
							<span className="text-sm font-medium">
								Filtro:{' '}
								{filterCategory.charAt(0).toUpperCase() +
									filterCategory.slice(1)}
							</span>
							<button
								type="button"
								onClick={() => handleFilterChange('all')}
								className="hover:bg-white/20 rounded-full p-1 transition-colors"
							>
								<svg
									aria-hidden="true"
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					)}
				</div>

				{/* Grid de produtos */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
					{currentProducts.map((product) => (
						<Link
							href={`/pages/products/${product.id}`}
							key={product.id}
							className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
						>
							<div className="relative aspect-square overflow-hidden bg-gray-100">
								<Image
									src={product.image}
									alt={product.name}
									width={400}
									height={400}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute top-3 right-3 bg-[#3C5F2D] text-white px-3 py-2 rounded-full font-semibold">
									R$ {product.price.toFixed(2)}
								</div>
							</div>
							<div className="p-4">
								<p className="text-xs uppercase tracking-wide text-[#3C5F2D] font-semibold mb-1">
									{product.category}
								</p>
								<h3 className="text-lg font-bold text-black group-hover:text-[#3C5F2D] transition-colors line-clamp-2">
									{product.name}
								</h3>
							</div>
						</Link>
					))}
				</div>

				{/* Paginação moderna */}
				{totalPages > 1 && (
					<div className="flex justify-center items-center gap-2 mt-12">
						<button
							type="button"
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 bg-white text-black rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-white disabled:hover:text-black"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						<div className="flex gap-2">
							{[...Array(totalPages)].map((_, i) => (
								<button
									type="button"
									key={String(i + 1)}
									onClick={() => setCurrentPage(i + 1)}
									className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
										currentPage === i + 1
											? 'bg-[#3C5F2D] text-white shadow-xl scale-110'
											: 'bg-white text-black hover:bg-[#3C5F2D] hover:text-white shadow-lg'
									}`}
								>
									{i + 1}
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
							className="px-4 py-2 bg-white text-black rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-white disabled:hover:text-black"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default function ProductsPage() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<ProductsContent />
		</Suspense>
	);
}
