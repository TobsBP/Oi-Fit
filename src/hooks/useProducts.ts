'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from '@/src/services/products';
import type { ProductCreate, ProductUpdate } from '@/src/types/products';

export function useProducts() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});

	return {
		products: data,
		error,
		isLoading,
	};
}

export function useProduct(id: string) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['product', id],
		queryFn: () => getProduct(id),
		enabled: !!id,
	});

	return {
		product: data,
		error,
		isLoading,
	};
}

export function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: ProductCreate) => createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) =>
			updateProduct(id, data),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
			queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
}
