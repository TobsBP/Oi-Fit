'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export interface Product {
	id: number;
	name: string;
	price: number;
	originalPrice?: number;
	category: string;
	image: string;
	description: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

interface CartContextType {
	items: CartItem[];
	isOpen: boolean;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
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

	const addToCart = (product: Product) => {
		setItems((prev) => {
			const existing = prev.find((item) => item.product.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prev, { product, quantity: 1 }];
		});
		setIsOpen(true);
	};

	const removeFromCart = (productId: number) => {
		setItems((prev) => prev.filter((item) => item.product.id !== productId));
	};

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}
		setItems((prev) =>
			prev.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item,
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
