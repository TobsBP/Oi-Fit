import type { Product } from './products';

export interface CartItem {
	product: Product;
	quantity: number;
	size?: string;
	color?: string;
}

export interface CartContextType {
	items: CartItem[];
	isOpen: boolean;
	addToCart: (product: Product, size?: string, color?: string) => void;
	removeFromCart: (productId: string, size?: string, color?: string) => void;
	updateQuantity: (
		productId: string,
		quantity: number,
		size?: string,
		color?: string,
	) => void;
	toggleCart: () => void;
	clearCart: () => void;
	totalItems: number;
	totalPrice: number;
}
