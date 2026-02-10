import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { SalesStats } from '../types/sales';

export async function getSalesStats(): Promise<SalesStats> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	const response = await api.get('/sales', {
		headers: { Authorization: `Bearer ${session.access_token}` },
	});

	return response.data;
}
