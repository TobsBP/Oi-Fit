'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllOrders, getMyOrders } from '@/src/services/orders';
import { createOrder } from '@/src/services/payment';
import type { PaymentCartItem } from '@/src/types/payment';

export function useOrders() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['orders'],
		queryFn: getAllOrders,
	});

	return {
		orders: data,
		error,
		isLoading,
	};
}

export function useMyOrders() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['orders-me'],
		queryFn: getMyOrders,
	});

	return {
		orders: data,
		error,
		isLoading,
	};
}

export function useCreateOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			items,
			cityName,
		}: {
			items: PaymentCartItem[];
			cityName: string;
		}) => createOrder(items, cityName),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders-me'] });
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});
}
