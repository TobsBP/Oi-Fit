'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export interface Product {
	id: string | number;
	name: string;
	price: number;
	discount?: number;
	category: string;
	images: string[];
	description: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
	size?: string;
	color?: string;
}

interface CartContextType {
	items: CartItem[];
	isOpen: boolean;
	addToCart: (product: Product, size?: string, color?: string) => void;
	removeFromCart: (
		productId: string | number,
		size?: string,
		color?: string,
	) => void;
	updateQuantity: (
		productId: string | number,
		quantity: number,
		size?: string,
		color?: string,
	) => void;
	toggleCart: () => void;
	clearCart: () => void;
	totalItems: number;
	totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const isInitialized = useRef(false);

	useEffect(() => {
		const savedCart = localStorage.getItem('cart-storage');
		if (savedCart) {
			try {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				setItems(JSON.parse(savedCart));
			} catch (e) {
				console.error('Failed to parse cart storage', e);
			}
		}
		isInitialized.current = true;
	}, []);

	useEffect(() => {
		if (isInitialized.current) {
			localStorage.setItem('cart-storage', JSON.stringify(items));
		}
	}, [items]);

	const addToCart = (product: Product, size?: string, color?: string) => {
		setItems((prev) => {
			const existingIndex = prev.findIndex(
				(item) =>
					item.product.id === product.id &&
					item.size === size &&
					item.color === color,
			);

			if (existingIndex > -1) {
				const newItems = [...prev];
				newItems[existingIndex].quantity += 1;
				return newItems;
			}
			return [...prev, { product, quantity: 1, size, color }];
		});
		setIsOpen(true);
	};

	const removeFromCart = (
		productId: string | number,
		size?: string,
		color?: string,
	) => {
		setItems((prev) =>
			prev.filter(
				(item) =>
					!(
						item.product.id === productId &&
						item.size === size &&
						item.color === color
					),
			),
		);
	};

	const updateQuantity = (
		productId: string | number,
		quantity: number,
		size?: string,
		color?: string,
	) => {
		if (quantity <= 0) {
			removeFromCart(productId, size, color);
			return;
		}
		setItems((prev) =>
			prev.map((item) =>
				item.product.id === productId &&
				item.size === size &&
				item.color === color
					? { ...item, quantity }
					: item,
			),
		);
	};

	const toggleCart = () => setIsOpen((prev) => !prev);
	const clearCart = () => setItems([]);

	const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = items.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	);

	return (
		<CartContext.Provider
			value={{
				items,
				isOpen,
				addToCart,
				removeFromCart,
				updateQuantity,
				toggleCart,
				clearCart,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}
