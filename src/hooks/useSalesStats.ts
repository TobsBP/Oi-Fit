'use client';

import { useQuery } from '@tanstack/react-query';
import { getSalesStats } from '@/src/services/sales';

export function useSalesStats() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['order-stats'],
		queryFn: getSalesStats,
	});

	return {
		stats: data ?? null,
		error,
		isLoading,
	};
}
