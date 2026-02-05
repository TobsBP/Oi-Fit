import type { ProductCreate, ProductUpdate } from '@/src/types/products';
import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';

async function getAuthHeaders() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	return { Authorization: `Bearer ${session.access_token}` };
}

export async function getProducts() {
	try {
		const { data } = await api.get('/products');
		return data;
	} catch (_error) {
		throw new Error('Erro ao buscar produtos');
	}
}

export async function getProduct(id: string) {
	try {
		const { data } = await api.get(`/product/${id}`);
		return data;
	} catch (_error) {
		throw new Error('Erro ao buscar produto');
	}
}

export async function createProduct(data: ProductCreate) {
	try {
		const headers = await getAuthHeaders();
		console.log('Creating product - headers:', headers);
		console.log('Creating product - data:', JSON.stringify(data));
		const response = await api.post('/product', data, { headers });
		return response.data;
	} catch (error: unknown) {
		if (error instanceof Error && 'response' in error) {
			const axiosError = error as {
				response?: { data: unknown; status: number };
			};
			console.error(
				'API response:',
				axiosError.response?.status,
				axiosError.response?.data,
			);
		}
		throw new Error('Erro ao criar produto.');
	}
}

export async function updateProduct(id: string, data: ProductUpdate) {
	try {
		const headers = await getAuthHeaders();
		const response = await api.put(`/product/${id}`, data, { headers });
		return response.data;
	} catch (_error: unknown) {
		throw new Error('Erro ao atualizar produto.');
	}
}

export async function deleteProduct(id: string) {
	try {
		const headers = await getAuthHeaders();
		const response = await api.delete(`/product/${id}`, { headers });
		return response.data;
	} catch (error: unknown) {
		console.error('Error deleting product:', error);
		throw new Error('Erro ao deletar produto.');
	}
}
