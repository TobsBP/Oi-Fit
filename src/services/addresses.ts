import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { AddressFormData, CepData } from '../types/address';

async function getSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw new Error('Usuário não autenticado');
	}

	return session;
}

export async function getAddresses() {
	const session = await getSession();
	const headers = { Authorization: `Bearer ${session.access_token}` };
	const { data } = await api.get(`/address/${session.user.id}`, { headers });
	return data;
}

export async function createAddress(formData: AddressFormData): Promise<void> {
	const session = await getSession();
	const headers = { Authorization: `Bearer ${session.access_token}` };
	const response = await api.post(
		'/address',
		{
			...formData,
			userId: session.user.id,
			country: 'BR',
		},
		{ headers },
	);
	return response.data;
}

export async function deleteAddress(addressId: string): Promise<void> {
	const session = await getSession();
	const headers = { Authorization: `Bearer ${session.access_token}` };
	await api.delete(`/address/${addressId}`, { headers });
}

export async function fetchCep(cep: string): Promise<CepData | null> {
	const cleanCep = cep.replace(/\D/g, '');
	if (cleanCep.length !== 8) return null;

	const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
	const data: CepData = await response.json();

	if (data.erro) return null;

	return data;
}
