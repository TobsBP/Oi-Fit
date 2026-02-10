import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { Order } from '../types/order';

export async function getMyOrders(): Promise<Order[]> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	const response = await api.get('/orders/me', {
		headers: { Authorization: `Bearer ${session.access_token}` },
	});

	return response.data;
}

export async function getAllOrders(): Promise<Order[]> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	const response = await api.get('/orders', {
		headers: { Authorization: `Bearer ${session.access_token}` },
	});

	return response.data;
}

export async function updateOrderDelivery(
	orderId: string,
	delivery: string,
): Promise<Order> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	const response = await api.patch(
		`/order/${orderId}`,
		{
			delivery,
		},
		{
			headers: { Authorization: `Bearer ${session.access_token}` },
		},
	);

	return response.data;
}
