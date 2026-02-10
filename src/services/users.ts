import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { User, UserListItem, UserUpdate } from '../types/user';
import { getAddresses } from './addresses';

async function getAuthHeaders() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	return { Authorization: `Bearer ${session.access_token}` };
}

export async function getUser(): Promise<User | null> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) return null;

	try {
		const [userRes, addresses] = await Promise.all([
			api.get(`/user/${session.user.id}`, {
				headers: { Authorization: `Bearer ${session.access_token}` },
			}),
			getAddresses().catch(() => []),
		]);

		return { ...userRes.data, addresses };
	} catch (_error) {
		return null;
	}
}

export async function getUsers(): Promise<UserListItem[]> {
	try {
		const headers = await getAuthHeaders();
		const { data } = await api.get('/users', { headers });
		return data;
	} catch (_error) {
		throw new Error('Erro ao buscar usuários');
	}
}

export async function updateUser(id: string, data: UserUpdate) {
	try {
		const headers = await getAuthHeaders();
		const response = await api.put(`/user/${id}`, data, { headers });
		return response.data;
	} catch (_error) {
		throw new Error('Erro ao atualizar usuário');
	}
}

export async function deleteUser(id: string) {
	try {
		const headers = await getAuthHeaders();
		const response = await api.delete(`/user/${id}`, { headers });
		return response.data;
	} catch (error: unknown) {
		if (
			error instanceof Error &&
			'response' in error &&
			(error as { response?: { data?: { error?: { code?: string } } } })
				.response?.data?.error?.code === '23503'
		) {
			throw new Error('HAS_ORDERS');
		}
		throw new Error('Erro ao remover usuário');
	}
}
