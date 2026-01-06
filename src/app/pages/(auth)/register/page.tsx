'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert('As senhas não coincidem!');
			return;
		}

		if (!acceptTerms) {
			alert('Você precisa aceitar os termos de uso!');
			return;
		}

		setLoading(true);
		console.log('Signup attempt:', formData);

		setTimeout(() => {
			setLoading(false);
			alert('Cadastro funcionalidade ainda não implementada.');
		}, 1000);
	};

	const passwordStrength = (password: string) => {
		if (password.length === 0) return { strength: 0, label: '', color: '' };
		if (password.length < 6)
			return { strength: 33, label: 'Fraca', color: 'bg-red-500' };
		if (password.length < 10)
			return { strength: 66, label: 'Média', color: 'bg-yellow-500' };
		return { strength: 100, label: 'Forte', color: 'bg-green-500' };
	};

	const passwordStatus = passwordStrength(formData.password);

	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] flex items-center justify-center p-4 relative overflow-hidden">
			{/* Elementos decorativos de fundo */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-10 right-10 w-96 h-96 bg-[#3C5F2D] rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
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
							Crie sua conta
						</h1>
						<p className="text-gray-600 text-center">
							Junte-se à comunidade Oi-Fit
						</p>
					</div>

					{/* Formulário */}
					<div className="space-y-5">
						{/* Campo de Nome */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-semibold text-[#3C5F2D] mb-2"
							>
								Nome Completo
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
									id="name"
									name="name"
									type="text"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#3C5F2D] focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
									placeholder="Seu nome completo"
								/>
							</div>
						</div>

						{/* Campo de Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-semibold text-[#3C5F2D] mb-2"
							>
								Email
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
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
								<input
									id="email"
									name="email"
									type="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#3C5F2D] focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
									placeholder="seu@email.com"
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
									name="password"
									type={showPassword ? 'text' : 'password'}
									required
									value={formData.password}
									onChange={handleChange}
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
							{/* Indicador de força da senha */}
							{formData.password && (
								<div className="mt-2">
									<div className="flex items-center gap-2">
										<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
											<div
												className={`h-full ${passwordStatus.color} transition-all duration-300`}
												style={{ width: `${passwordStatus.strength}%` }}
											></div>
										</div>
										<span className="text-xs font-medium text-gray-600">
											{passwordStatus.label}
										</span>
									</div>
								</div>
							)}
						</div>

						{/* Campo de Confirmar Senha */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-semibold text-[#3C5F2D] mb-2"
							>
								Confirmar Senha
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
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#3C5F2D] focus:bg-white focus:outline-none transition-all duration-300 text-gray-900"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center"
								>
									{showConfirmPassword ? (
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
							{/* Validação visual */}
							{formData.confirmPassword && (
								<div className="mt-2 flex items-center gap-2">
									{formData.password === formData.confirmPassword ? (
										<>
											<svg
												aria-hidden="true"
												className="w-4 h-4 text-green-500"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span className="text-xs text-green-600 font-medium">
												As senhas coincidem
											</span>
										</>
									) : (
										<>
											<svg
												aria-hidden="true"
												className="w-4 h-4 text-red-500"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
											<span className="text-xs text-red-600 font-medium">
												As senhas não coincidem
											</span>
										</>
									)}
								</div>
							)}
						</div>

						{/* Termos de uso */}
						<div className="pt-2">
							<label className="flex items-start cursor-pointer group">
								<input
									type="checkbox"
									checked={acceptTerms}
									onChange={(e) => setAcceptTerms(e.target.checked)}
									className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#3C5F2D] focus:ring-[#3C5F2D] cursor-pointer"
								/>
								<span className="ml-2 text-sm text-gray-600 group-hover:text-[#3C5F2D] transition-colors">
									Eu aceito os{' '}
									<Link
										href="#"
										className="font-semibold text-[#3C5F2D] hover:text-[#4a7338]"
									>
										Termos de Uso
									</Link>{' '}
									e{' '}
									<Link
										href="#"
										className="font-semibold text-[#3C5F2D] hover:text-[#4a7338]"
									>
										Política de Privacidade
									</Link>
								</span>
							</label>
						</div>

						{/* Botão de Cadastro */}
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
									Criando conta...
								</>
							) : (
								<>
									Criar Conta
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
											d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
										/>
									</svg>
								</>
							)}
						</button>
					</div>

					{/* Divider */}
					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t-2 border-gray-200"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-white text-gray-500 font-medium">
								ou
							</span>
						</div>
					</div>

					{/* Cadastro Social */}
					<div className="space-y-3">
						<button
							type="button"
							className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#3C5F2D] transition-all duration-300 group"
						>
							<svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="font-medium text-gray-700 group-hover:text-[#3C5F2D] transition-colors">
								Cadastrar com Google
							</span>
						</button>
					</div>

					{/* Login */}
					<p className="text-center text-sm text-gray-600 mt-8">
						Já tem uma conta?{' '}
						<Link
							href="/pages/login"
							className="font-bold text-[#3C5F2D] hover:text-[#4a7338] transition-colors"
						>
							Fazer Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
