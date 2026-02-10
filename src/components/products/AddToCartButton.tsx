'use client';

import { useCart } from '@/src/context/CartContext';
import type { AddToCartButtonProps } from '@/src/types/components';

export default function AddToCartButton({
	product,
	className = '',
	selectedSize,
	selectedColor,
}: AddToCartButtonProps) {
	const { addToCart } = useCart();

	return (
		<button
			type="button"
			onClick={() => addToCart(product, selectedSize, selectedColor)}
			className={`w-full bg-[#3C5F2D] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#8eb37d] transition-colors ${className}`}
		>
			Adicionar ao Carrinho
		</button>
	);
}
