'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from '@/src/services/users';
import type { UserUpdate } from '@/src/types/user';

export function useUsers() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
	});

	return {
		users: data,
		error,
		isLoading,
	};
}

export function useCurrentUser() {
	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['user-current'],
		queryFn: getUser,
	});

	return {
		user: data,
		error,
		isLoading,
		refetch,
	};
}

export function useUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
			updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
}
