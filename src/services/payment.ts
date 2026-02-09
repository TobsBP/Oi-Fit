import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { PaymentCartItem } from '../types/payment';

export async function createOrder(
	items: PaymentCartItem[],
	cityName: string,
): Promise<string> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	const response = await api.post(
		'/order',
		{ items, cityName },
		{ headers: { Authorization: `Bearer ${session.access_token}` } },
	);

	return response.data.clientSecret;
}
