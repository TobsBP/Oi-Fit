import { supabase } from '../lib/supabase';
import type { Register } from '../types/auth';

export async function signUp(
	data: Register,
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

export async function signIn(
	data: { email: string; password: string },
	router: any,
	setLoading: (loading: boolean) => void,
) {
	try {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		alert('Login realizado com sucesso!');
		router.push('/');
	} catch (error) {
		console.error('Signin error:', error);
		alert('Ocorreu um erro ao fazer login.');
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
