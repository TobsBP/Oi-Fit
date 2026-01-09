import type { registerSchema } from '../types/auth';
import { supabase } from './supabase';

export async function signUp(
	data: registerSchema,
	router: any,
	setLoading: (loading: boolean) => void,
) {
	try {
		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					name: data.name,
					phone: data.phone,
				},
			},
		});

		if (error) {
			alert(error.message);
			return;
		}

		alert('Cadastro realizado com sucesso! Faça login para continuar.');
		router.push('/pages/login');
	} catch (error) {
		console.error('Signup error:', error);
		alert('Ocorreu um erro ao criar a conta.');
	} finally {
		setLoading(false);
	}
}

export async function signOut(router: any) {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			alert(error.message);
			return;
		}

		router.push('/pages/products');
		router.refresh();
	} catch (error) {
		alert('Ocorreu um erro ao sair da conta.');
	}
}
