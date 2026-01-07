'use client';

import type React from 'react';
import { useState } from 'react';
import { products as initialProducts } from '@/src/data/products';

interface ProductVariant {
	size: string;
	color: string;
	stock: number;
}

interface Product {
	id: number;
	name: string;
	price: number;
	originalPrice?: number;
	category: string;
	image: string;
	images: string[];
	description: string;
	stock: number;
	variants: ProductVariant[];
}

export default function ProductsManager() {
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [isEditing, setIsEditing] = useState<Product | null>(null);
	const [isAdding, setIsAdding] = useState(false);

	// Form states
	const [formData, setFormData] = useState<Omit<Product, 'id'>>({
		name: '',
		price: 0,
		originalPrice: 0,
		category: '',
		image: '/Logo.jpg',
		images: ['/Logo.jpg'],
		description: '',
		stock: 0,
		variants: [],
	});

	// State for new variant input
	const [newVariant, setNewVariant] = useState<ProductVariant>({
		size: '',
		color: '',
		stock: 0,
	});

	const handleDelete = (id: number) => {
		if (confirm('Tem certeza que deseja remover este produto?')) {
			setProducts(products.filter((p) => p.id !== id));
		}
	};

	const handleEdit = (product: Product) => {
		setIsEditing(product);
		setFormData({
			name: product.name,
			price: product.price,
			originalPrice: product.originalPrice || 0,
			category: product.category,
			image: product.image,
			images: product.images || [product.image],
			description: product.description,
			stock: product.stock || 0,
			variants: product.variants || [],
		});
		setIsAdding(false);
	};

	const handleAddNew = () => {
		setIsAdding(true);
		setIsEditing(null);
		setFormData({
			name: '',
			price: 0,
			originalPrice: 0,
			category: '',
			image: '/Logo.jpg',
			images: ['/Logo.jpg'],
			description: '',
			stock: 0,
			variants: [],
		});
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		const totalStock = formData.variants.reduce(
			(acc, curr) => acc + curr.stock,
			0,
		);
		const productData = {
			...formData,
			stock: totalStock, // Update stock based on variants
			image: formData.images[0] || '/Logo.jpg', // Ensure main image matches first of gallery
		};

		if (isEditing) {
			setProducts(
				products.map((p) =>
					p.id === isEditing.id ? { ...p, ...productData } : p,
				),
			);
			setIsEditing(null);
		} else {
			const newId = Math.max(...products.map((p) => p.id), 0) + 1;
			setProducts([...products, { id: newId, ...productData }]);
			setIsAdding(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(null);
		setIsAdding(false);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			Array.from(files).forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					setFormData((prev) => ({
						...prev,
						images: [...prev.images, reader.result as string],
					}));
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeImage = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const addVariant = () => {
		if (newVariant.size && newVariant.color) {
			setFormData((prev) => ({
				...prev,
				variants: [...prev.variants, newVariant],
			}));
			setNewVariant({ size: '', color: '', stock: 0 });
		} else {
			alert('Preencha tamanho e cor');
		}
	};

	const removeVariant = (index: number) => {
		setFormData((prev) => ({
			...prev,
			variants: prev.variants.filter((_, i) => i !== index),
		}));
	};

	if (isEditing || isAdding) {
		return (
			<div className="bg-white p-6 rounded-xl border border-[#3C5F2D]/20 shadow-sm">
				<h3 className="text-xl font-bold text-[#3C5F2D] mb-4">
					{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
				</h3>
				<form onSubmit={handleSave} className="space-y-4">
					<div>
						<label
							htmlFor="product-name"
							className="block text-sm font-medium text-gray-700"
						>
							Nome
						</label>
						<input
							id="product-name"
							type="text"
							required
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<div>
							<label
								htmlFor="product-price"
								className="block text-sm font-medium text-gray-700"
							>
								Preço Atual (R$)
							</label>
							<input
								id="product-price"
								type="number"
								required
								step="0.01"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.price}
								onChange={(e) =>
									setFormData({
										...formData,
										price: parseFloat(e.target.value),
									})
								}
							/>
						</div>
						<div>
							<label
								htmlFor="product-original-price"
								className="block text-sm font-medium text-gray-700"
							>
								Preço Original (R$)
							</label>
							<input
								id="product-original-price"
								type="number"
								step="0.01"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.originalPrice}
								onChange={(e) =>
									setFormData({
										...formData,
										originalPrice: parseFloat(e.target.value),
									})
								}
							/>
						</div>
						<div className="col-span-2 md:col-span-1">
							<label
								htmlFor="product-category"
								className="block text-sm font-medium text-gray-700"
							>
								Categoria
							</label>
							<input
								id="product-category"
								type="text"
								required
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
							/>
						</div>
					</div>

					{/* Variantes Section */}
					<div className="border-t border-b py-4 my-4">
						<h4 className="font-bold text-gray-700 mb-2">
							Estoque e Variantes
						</h4>
						<div className="flex gap-2 mb-4 items-end">
							<div>
								<label
									htmlFor="variant-size"
									className="block text-xs text-gray-500"
								>
									Tamanho
								</label>
								<input
									id="variant-size"
									type="text"
									placeholder="Ex: P, M, 38"
									className="border text-gray-500 rounded px-2 py-1 w-24"
									value={newVariant.size}
									onChange={(e) =>
										setNewVariant({ ...newVariant, size: e.target.value })
									}
								/>
							</div>
							<div>
								<label
									htmlFor="variant-color"
									className="block text-xs text-gray-500"
								>
									Cor
								</label>
								<input
									id="variant-color"
									type="text"
									placeholder="Ex: Azul"
									className="border text-gray-500 rounded px-2 py-1 w-32"
									value={newVariant.color}
									onChange={(e) =>
										setNewVariant({ ...newVariant, color: e.target.value })
									}
								/>
							</div>
							<div>
								<label
									htmlFor="variant-stock"
									className="block text-xs text-gray-500"
								>
									Qtd
								</label>
								<input
									id="variant-stock"
									type="number"
									className="border text-gray-500 rounded px-2 py-1 w-20"
									value={newVariant.stock}
									onChange={(e) =>
										setNewVariant({
											...newVariant,
											stock: parseInt(e.target.value, 10) || 0,
										})
									}
								/>
							</div>
							<button
								type="button"
								onClick={addVariant}
								className="bg-[#3C5F2D] text-white px-3 py-1 rounded hover:bg-[#2d4721] text-sm h-8.5"
							>
								Adicionar
							</button>
						</div>

						<div className="bg-gray-50 rounded-lg p-3">
							{formData.variants.length === 0 ? (
								<p className="text-sm text-gray-500 italic">
									Nenhuma variante adicionada.
								</p>
							) : (
								<table className="w-full text-sm">
									<thead>
										<tr className="text-left text-gray-500">
											<th className="pb-2">Tamanho</th>
											<th className="pb-2">Cor</th>
											<th className="pb-2">Estoque</th>
											<th className="pb-2 text-right">Ação</th>
										</tr>
									</thead>
									<tbody>
										{formData.variants.map((v, idx) => (
											<tr
												key={`${v.size}-${v.color}`}
												className="border-t border-gray-200 text-gray-500"
											>
												<td className="py-2">{v.size}</td>
												<td className="py-2">{v.color}</td>
												<td className="py-2">{v.stock}</td>
												<td className="py-2 text-right">
													<button
														type="button"
														onClick={() => removeVariant(idx)}
														className="text-red-500 hover:text-red-700"
													>
														✕
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
							<div className="mt-2 pt-2 border-t flex justify-between items-center text-sm font-bold text-gray-700">
								<span>Total em Estoque:</span>
								<span>
									{formData.variants.reduce((acc, curr) => acc + curr.stock, 0)}
								</span>
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="product-images"
							className="block text-sm font-medium text-gray-700"
						>
							Imagens do Produto
						</label>
						<div
							id="product-images"
							className="mt-2 grid grid-cols-3 md:grid-cols-5 gap-4"
						>
							{formData.images.map((img, index) => (
								<div
									key={img}
									className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden group"
								>
									{/* biome-ignore lint/performance/noImgElement: Local preview image */}
									<img
										src={img}
										alt={`Preview ${index}`}
										className="w-full h-full object-cover"
									/>
									<button
										type="button"
										onClick={() => removeImage(index)}
										className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
										aria-label="Remove image"
									>
										<svg
											className="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Remove</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
									{index === 0 && (
										<div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] text-center py-1">
											Principal
										</div>
									)}
								</div>
							))}
							<div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
								<input
									type="file"
									accept="image/*"
									multiple
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									onChange={handleImageUpload}
								/>
								<div className="text-center">
									<span className="text-2xl text-gray-400">+</span>
									<p className="text-[10px] text-gray-500">Adicionar</p>
								</div>
							</div>
						</div>
						<p className="mt-1 text-xs text-gray-500">
							A primeira imagem será a principal. Você pode adicionar várias.
						</p>
					</div>
					<div>
						<label
							htmlFor="product-description"
							className="block text-sm font-medium text-gray-700"
						>
							Descrição
						</label>
						<textarea
							id="product-description"
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
							rows={3}
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</div>
					<div className="flex justify-end gap-3 pt-4">
						<button
							type="button"
							onClick={handleCancel}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-[#3C5F2D] rounded-md hover:bg-[#2d4721]"
						>
							Salvar
						</button>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold text-[#3C5F2D]">Gerenciar Produtos</h3>
				<button
					type="button"
					onClick={handleAddNew}
					className="px-4 py-2 bg-[#3C5F2D] text-white rounded-md text-sm font-medium hover:bg-[#2d4721] transition-colors"
				>
					+ Adicionar Produto
				</button>
			</div>

			<div className="bg-white rounded-xl border border-[#3C5F2D]/20 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-[#3C5F2D]/5 text-[#3C5F2D] font-bold uppercase text-xs">
							<tr>
								<th className="px-6 py-3">Imagem</th>
								<th className="px-6 py-3">Produto</th>
								<th className="px-6 py-3">Categoria</th>
								<th className="px-6 py-3">Preço</th>
								<th className="px-6 py-3">Estoque Total</th>
								<th className="px-6 py-3 text-right">Ações</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{products.map((product) => (
								<tr key={product.id} className="hover:bg-gray-50">
									<td className="px-6 py-4">
										<div className="relative">
											{/* biome-ignore lint/performance/noImgElement: Simple table thumbnail */}
											<img
												src={product.images ? product.images[0] : product.image}
												alt={product.name}
												className="w-10 h-10 object-cover rounded-md border"
											/>
											{product.images && product.images.length > 1 && (
												<span className="absolute -top-1 -right-1 bg-[#3C5F2D] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
													{product.images.length}
												</span>
											)}
										</div>
									</td>
									<td className="px-6 py-4 font-medium text-gray-900">
										<div>{product.name}</div>
										<div className="text-xs text-gray-500">
											{product.variants
												?.map((v) => `${v.size}/${v.color}`)
												.join(', ')}
										</div>
									</td>
									<td className="px-6 py-4 text-gray-500">
										{product.category}
									</td>
									<td className="px-6 py-4 text-gray-900">
										R$ {product.price.toFixed(2)}
									</td>
									<td className="px-6 py-4">
										{product.stock === 0 ? (
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
												Esgotado
											</span>
										) : (
											<span className="text-gray-900">{product.stock} un.</span>
										)}
									</td>
									<td className="px-6 py-4 text-right space-x-2">
										<button
											type="button"
											onClick={() => handleEdit(product)}
											className="text-blue-600 hover:text-blue-800 font-medium"
										>
											Editar
										</button>
										<button
											type="button"
											onClick={() => handleDelete(product.id)}
											className="text-red-600 hover:text-red-800 font-medium"
										>
											Remover
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
