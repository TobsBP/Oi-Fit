'use client';

import Image from 'next/image';
import { useCart } from '@/src/context/CartContext';

export default function CartSidebar() {
	const {
		isOpen,
		toggleCart,
		items,
		updateQuantity,
		removeFromCart,
		totalPrice,
	} = useCart();

	if (!isOpen) return null;

	return (
		<>
			{/* Overlay */}
			<button
				type="button"
				className="fixed inset-0 bg-black/50 z-50 transition-opacity w-full h-full cursor-default"
				onClick={toggleCart}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') toggleCart();
				}}
				aria-label="Close cart"
			/>

			{/* Sidebar */}
			<div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300">
				<div className="flex items-center justify-between p-6 border-b">
					<h2 className="text-2xl font-bold text-[#3C5F2D]">Seu Carrinho</h2>
					<button
						type="button"
						onClick={toggleCart}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						aria-label="Close cart"
					>
						<svg
							className="w-6 h-6 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
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

				<div className="flex-1 overflow-y-auto p-6 space-y-6">
					{items.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
							<button
								type="button"
								onClick={toggleCart}
								className="text-[#3C5F2D] font-semibold hover:underline"
							>
								Continuar comprando
							</button>
						</div>
					) : (
						items.map(({ product, quantity, size, color }, index) => (
							<div
								key={`${product.id}-${size}-${color}-${index}`}
								className="flex gap-4"
							>
								<div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1 flex flex-col justify-between">
									<div className="flex justify-between">
										<div>
											<h3 className="font-semibold text-gray-800">
												{product.name}
											</h3>
											{(size || color) && (
												<p className="text-xs text-gray-500 mt-1">
													{size && <span className="mr-2">Tam: {size}</span>}
													{color && <span>Cor: {color}</span>}
												</p>
											)}
										</div>
										<button
											type="button"
											onClick={() => removeFromCart(product.id, size, color)}
											className="text-red-500 hover:text-red-600 p-1"
											aria-label="Remove item"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
									<div className="flex items-center justify-between">
										<span className="font-bold text-[#3C5F2D]">
											R$ {product.price.toFixed(2)}
										</span>
										<div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
											<button
												type="button"
												onClick={() =>
													updateQuantity(product.id, quantity - 1, size, color)
												}
												className="w-6 h-6 flex items-center justify-center rounded bg-white shadow text-gray-600 hover:text-[#3C5F2D]"
												aria-label="Decrease quantity"
											>
												-
											</button>
											<span className="text-sm w-4 text-center">
												{quantity}
											</span>
											<button
												type="button"
												onClick={() =>
													updateQuantity(product.id, quantity + 1, size, color)
												}
												className="w-6 h-6 flex items-center justify-center rounded bg-white shadow text-gray-600 hover:text-[#3C5F2D]"
												aria-label="Increase quantity"
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{items.length > 0 && (
					<div className="border-t p-6 bg-gray-50">
						<div className="flex justify-between items-center mb-6">
							<span className="text-lg font-semibold text-gray-700">Total</span>
							<span className="text-2xl font-bold text-[#3C5F2D]">
								R$ {totalPrice.toFixed(2)}
							</span>
						</div>
						<button
							type="button"
							className="w-full bg-[#3C5F2D] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#2d4722] transition-colors shadow-lg shadow-[#3C5F2D]/20"
						>
							Finalizar Compra
						</button>
					</div>
				)}
			</div>
		</>
	);
}
