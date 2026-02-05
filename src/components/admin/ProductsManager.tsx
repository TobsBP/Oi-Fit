'use client';

import type React from 'react';
import { useState } from 'react';
import {
	useCreateProduct,
	useDeleteProduct,
	useProducts,
	useUpdateProduct,
} from '@/src/hooks/useProducts';
import { uploadImage } from '@/src/services/uploads';
import type { Product, ProductCreate } from '@/src/types/products';

interface ProductFormData {
	name: string;
	price: string;
	discount: string;
	category: string;
	size: string;
	stock: number;
	images: string[];
	description: string;
}

export default function ProductsManager() {
	const { products, isLoading } = useProducts();
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();

	const [isEditing, setIsEditing] = useState<Product | null>(null);
	const [isAdding, setIsAdding] = useState(false);

	const [formData, setFormData] = useState<ProductFormData>({
		name: '',
		price: '',
		discount: '0',
		category: '',
		size: '',
		stock: 0,
		images: ['/Logo.jpg'],
		description: '',
	});

	const [pendingImages, setPendingImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const displayProducts: Product[] = (products as Product[]) || [];

	const handleDelete = async (id: string) => {
		if (confirm('Tem certeza que deseja remover este produto?')) {
			try {
				await deleteProduct.mutateAsync(id);
			} catch (error) {
				console.error(error);
				alert('Erro ao deletar produto');
			}
		}
	};

	const handleEdit = (product: Product) => {
		setIsEditing(product);
		setFormData({
			name: product.name,
			price: String(product.price),
			discount: String(product.discount || 0),
			category: product.category,
			size: product.size || '',
			stock: product.stock || 0,
			images: product.images || ['/Logo.jpg'],
			description: product.description,
		});
		setPendingImages([]);
		setPreviewUrls([]);
		setIsAdding(false);
	};

	const handleAddNew = () => {
		setIsAdding(true);
		setIsEditing(null);
		setFormData({
			name: '',
			price: '',
			discount: '0',
			category: '',
			size: '',
			stock: 0,
			images: ['/Logo.jpg'],
			description: '',
		});
		setPendingImages([]);
		setPreviewUrls([]);
	};

	const uploadImageToCloudinary = async (file: File): Promise<string> => {
		return uploadImage(file);
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const uploadedUrls: string[] = [];
			for (const file of pendingImages) {
				const url = await uploadImageToCloudinary(file);
				uploadedUrls.push(url);
			}

			const allImages = [...formData.images, ...uploadedUrls].filter(
				(img) => !img.startsWith('blob:'),
			);

			if (allImages.length === 0) allImages.push('/Logo.jpg');

			const priceNum = parseFloat(formData.price.replace(',', '.'));
			const discountNum = parseFloat(formData.discount.replace(',', '.')) || 0;

			if (Number.isNaN(priceNum)) {
				alert('O preco deve ser um número válido');
				return;
			}

			if (isEditing) {
				await updateProduct.mutateAsync({
					id: isEditing.id,
					data: {
						id: isEditing.id,
						name: formData.name,
						description: formData.description,
						price: priceNum,
						discount: discountNum,
						category: formData.category,
						size: formData.size,
						stock: formData.stock,
						images: allImages,
						isActive: isEditing.isActive,
						createdAt: isEditing.createdAt,
						updatedAt: isEditing.updatedAt,
					},
				});
				setIsEditing(null);
			} else {
				const productData: ProductCreate = {
					name: formData.name,
					description: formData.description,
					price: priceNum,
					discount: discountNum,
					category: formData.category,
					size: formData.size,
					stock: formData.stock,
					images: allImages,
					isActive: true,
				};
				await createProduct.mutateAsync(productData);
				setIsAdding(false);
			}
			setPendingImages([]);
			setPreviewUrls([]);
		} catch (error) {
			console.error(error);
			alert('Erro ao salvar produto.');
		}
	};

	const handleCancel = () => {
		setIsEditing(null);
		setIsAdding(false);
		setPendingImages([]);
		setPreviewUrls([]);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newFiles = Array.from(files);
			const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

			setPendingImages((prev) => [...prev, ...newFiles]);
			setPreviewUrls((prev) => [...prev, ...newPreviews]);
		}
	};

	const removeImage = (index: number) => {
		const existingCount = formData.images.length;

		if (index < existingCount) {
			setFormData((prev) => ({
				...prev,
				images: prev.images.filter((_, i) => i !== index),
			}));
		} else {
			const pendingIndex = index - existingCount;
			setPendingImages((prev) => prev.filter((_, i) => i !== pendingIndex));
			setPreviewUrls((prev) => prev.filter((_, i) => i !== pendingIndex));
		}
	};

	if (isEditing || isAdding) {
		const displayImages = [...formData.images, ...previewUrls];

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
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div>
							<label
								htmlFor="product-price"
								className="block text-sm font-medium text-gray-700"
							>
								Preco (R$)
							</label>
							<input
								id="product-price"
								type="number"
								required
								step="0.01"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.price}
								onChange={(e) =>
									setFormData({
										...formData,
										price: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<label
								htmlFor="product-discount"
								className="block text-sm font-medium text-gray-700"
							>
								Desconto (%)
							</label>
							<input
								id="product-discount"
								type="number"
								step="1"
								min="0"
								max="100"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.discount}
								onChange={(e) =>
									setFormData({
										...formData,
										discount: e.target.value,
									})
								}
							/>
						</div>
						<div>
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
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
							/>
						</div>
						<div>
							<label
								htmlFor="product-size"
								className="block text-sm font-medium text-gray-700"
							>
								Tamanho
							</label>
							<input
								id="product-size"
								type="text"
								placeholder="Ex: P, M, G"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.size}
								onChange={(e) =>
									setFormData({ ...formData, size: e.target.value })
								}
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="product-stock"
							className="block text-sm font-medium text-gray-700"
						>
							Estoque
						</label>
						<input
							id="product-stock"
							type="number"
							min="0"
							className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
							value={formData.stock}
							onChange={(e) =>
								setFormData({
									...formData,
									stock: parseInt(e.target.value, 10) || 0,
								})
							}
						/>
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
							{displayImages.map((img, index) => (
								<div
									key={img}
									className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden group"
								>
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
							A primeira imagem sera a principal. Voce pode adicionar varias.
						</p>
					</div>
					<div>
						<label
							htmlFor="product-description"
							className="block text-sm font-medium text-gray-700"
						>
							Descricao
						</label>
						<textarea
							id="product-description"
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
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
							disabled={createProduct.isPending || updateProduct.isPending}
							className={`px-4 py-2 text-sm font-medium text-white bg-[#3C5F2D] rounded-md hover:bg-[#2d4721] ${
								createProduct.isPending || updateProduct.isPending
									? 'opacity-50 cursor-not-allowed'
									: ''
							}`}
						>
							{createProduct.isPending || updateProduct.isPending
								? 'Salvando...'
								: 'Salvar'}
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
								<th className="px-6 py-3">Tamanho</th>
								<th className="px-6 py-3">Preco</th>
								<th className="px-6 py-3">Estoque</th>
								<th className="px-6 py-3 text-right">Acoes</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{isLoading ? (
								<tr>
									<td colSpan={7} className="px-6 py-4 text-center">
										Carregando...
									</td>
								</tr>
							) : displayProducts.length === 0 ? (
								<tr>
									<td colSpan={7} className="px-6 py-4 text-center">
										Nenhum produto encontrado.
									</td>
								</tr>
							) : (
								displayProducts.map((product) => (
									<tr key={product.id} className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="relative">
												<img
													src={
														product.images && product.images.length > 0
															? product.images[0]
															: '/Logo.jpg'
													}
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
											{product.name}
										</td>
										<td className="px-6 py-4 text-gray-500">
											{product.category}
										</td>
										<td className="px-6 py-4 text-gray-500">
											{product.size || '-'}
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
												<span className="text-gray-900">
													{product.stock} un.
												</span>
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
												disabled={deleteProduct.isPending}
											>
												Remover
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
