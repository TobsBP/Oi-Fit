'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/src/lib/supabase';

export default function LoginPage() {
	const [loginValue, setLoginValue] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const isEmail = loginValue.includes('@');
			const credentials = isEmail
				? { email: loginValue, password }
				: { phone: loginValue, password };

			const { error } = await supabase.auth.signInWithPassword(credentials);

			if (error) {
				alert(error.message);
				return;
			}

			router.push('/');
			router.refresh();
		} catch (error) {
			console.error('Login error:', error);
			alert('Ocorreu um erro ao fazer login.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] flex items-center justify-center p-4 relative overflow-hidden">
			{/* Elementos decorativos de fundo */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 left-10 w-96 h-96 bg-[#3C5F2D] rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
			</div>

			{/* Container principal */}
			<div className="relative z-10 w-full max-w-md">
				<div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-[1.01] transition-transform duration-300">
					{/* Header com logo */}
					<div className="flex flex-col items-center mb-8">
						<div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#3C5F2D] ring-offset-4 mb-6">
							<Image
								src="/Logo.jpg"
								alt="Oi-Fit Logo"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<h1 className="text-3xl font-bold text-[#3C5F2D] mb-2">
							Bem-vindo(a)!
						</h1>
						<p className="text-gray-600 text-center">
							Entre na sua conta Oi-Fit
						</p>
					</div>

					{/* Formulário */}
					<div className="space-y-5">
						{/* Campo de Login (Email ou Telefone) */}
						<div>
							<label
								htmlFor="loginValue"
								className="block text-sm font-semibold text-[#3C5F2D] mb-2"
							>
								Email ou Telefone
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<input
									id="loginValue"
									type="text"
									required
									value={loginValue}
									onChange={(e) => setLoginValue(e.target.value)}
									className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#3C5F2D] focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
									placeholder="seu@email.com ou (35) 99999-9999"
								/>
							</div>
						</div>

						{/* Campo de Senha */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-[#3C5F2D] mb-2"
							>
								Senha
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#3C5F2D] focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center"
								>
									{showPassword ? (
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-400 hover:text-[#3C5F2D] transition-colors"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
											/>
										</svg>
									) : (
										<svg
											aria-hidden="true"
											className="w-5 h-5 text-gray-400 hover:text-[#3C5F2D] transition-colors"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Lembrar-me e Esqueceu senha */}
						<div className="flex items-center justify-between">
							<label className="flex items-center cursor-pointer group">
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-gray-300 text-[#3C5F2D] focus:ring-[#3C5F2D] cursor-pointer"
								/>
								<span className="ml-2 text-sm text-gray-600 group-hover:text-[#3C5F2D] transition-colors">
									Lembrar de mim
								</span>
							</label>
							<Link
								href="#"
								className="text-sm font-semibold text-[#3C5F2D] hover:text-[#4a7338] transition-colors"
							>
								Esqueceu a senha?
							</Link>
						</div>

						{/* Botão de Login */}
						<button
							type="button"
							onClick={handleSubmit}
							disabled={loading}
							className="w-full bg-linear-to-r from-[#3C5F2D] to-[#4a7338] text-white font-bold py-4 rounded-xl hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<svg
										aria-hidden="true"
										className="w-5 h-5 animate-spin"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Entrando...
								</>
							) : (
								<>
									Entrar
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</>
							)}
						</button>
					</div>

					{/* Cadastro */}
					<p className="text-center text-sm text-gray-600 mt-8">
						Não tem uma conta?{' '}
						<Link
							href="/pages/register"
							className="font-bold text-[#3C5F2D] hover:text-[#4a7338] transition-colors"
						>
							Cadastre-se gratuitamente
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
