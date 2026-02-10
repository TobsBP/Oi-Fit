'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	createAddress,
	deleteAddress,
	fetchCep,
} from '@/src/services/addresses';
import type { AddressFormData } from '@/src/types/address';

export function useCreateAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: AddressFormData) => createAddress(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-current'] });
		},
	});
}

export function useDeleteAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (addressId: string) => deleteAddress(addressId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user-current'] });
		},
	});
}

export function useFetchCep() {
	return useMutation({
		mutationFn: (cep: string) => fetchCep(cep),
	});
}
