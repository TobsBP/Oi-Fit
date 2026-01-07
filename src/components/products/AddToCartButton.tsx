'use client';

import { type Product, useCart } from '@/src/context/CartContext';

interface AddToCartButtonProps {
	product: Product;
	className?: string;
}

export default function AddToCartButton({
	product,
	className = '',
}: AddToCartButtonProps) {
	const { addToCart } = useCart();

	return (
		<button
			type="button"
			onClick={() => addToCart(product)}
			className={`w-full bg-[#3C5F2D] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#8eb37d] transition-colors ${className}`}
		>
			Adicionar ao Carrinho
		</button>
	);
}
