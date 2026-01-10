'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import type { User } from '@/src/types/user';
import { getStatusColor } from '@/src/utils/StatusColor';
import { translateStatus } from '@/src/utils/TranslateStatus';

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState('profile');
	const [showEditMenu, setShowEditMenu] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (!session) {
					router.push('/pages/login');
					return;
				}

				const response = await fetch('/api/user', {
					headers: {
						Authorization: `Bearer ${session.access_token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setUserData(data);
				} else {
					if (response.status === 401) {
						router.push('/pages/login');
					}
					console.error('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [router]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C5F2D]" />
			</div>
		);
	}

	if (!userData) return null;

	const primaryAddress = userData.addresses?.[0];

	return (
		<div className="min-h-screen text-black bg-gray-50">
			<div className="max-w-7xl mx-auto p-6 md:p-8 pt-20 md:pt-20">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-[#3C5F2D] mb-2">
						Meu Perfil
					</h1>
					<p className="text-gray-600">Gerencie suas informações e pedidos</p>
				</div>

				{/* Tabs */}
				<div className="flex gap-4 mb-8 border-b-2 border-gray-200">
					<button
						type="button"
						onClick={() => setActiveTab('profile')}
						className={`px-6 py-3 font-medium transition-all duration-300 ${
							activeTab === 'profile'
								? 'text-[#3C5F2D] border-b-4 border-[#3C5F2D] -mb-0.5'
								: 'text-gray-500 hover:text-[#3C5F2D]'
						}`}
					>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-label="Dados Pessoais"
							>
								<title>Dados Pessoais</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Dados Pessoais
						</div>
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('orders')}
						className={`px-6 py-3 font-medium transition-all duration-300 ${
							activeTab === 'orders'
								? 'text-[#3C5F2D] border-b-4 border-[#3C5F2D] -mb-0.5'
								: 'text-gray-500 hover:text-[#3C5F2D]'
						}`}
					>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-label="Meus Pedidos"
							>
								<title>Meus Pedidos</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								/>
							</svg>
							Meus Pedidos
						</div>
					</button>
				</div>

				{/* Conteúdo das Tabs */}
				{activeTab === 'profile' && (
					<div className="space-y-6">
						{/* Card de Informações Pessoais */}
						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-[#3C5F2D]">
									Informações Pessoais
								</h2>
								<button
									type="button"
									onClick={() => setShowEditMenu(!showEditMenu)}
									className="px-6 py-3 bg-[#3C5F2D] text-white font-medium rounded-2xl hover:bg-[#2d4722] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										role="img"
										aria-label="Editar"
									>
										<title>Editar</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
									Editar
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<span className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
										Nome Completo
									</span>
									<p className="text-lg font-medium text-black">
										{userData.name || 'Não informado'}
									</p>
								</div>

								<div className="space-y-2">
									<span className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
										E-mail
									</span>
									<p className="text-lg font-medium text-black">
										{userData.email}
									</p>
								</div>

								<div className="space-y-2">
									<span className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
										Telefone
									</span>
									<p className="text-lg font-medium text-black">
										{userData.phone || 'Não informado'}
									</p>
								</div>
							</div>
						</div>

						{/* Card de Endereço */}
						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-[#3C5F2D]">Endereço</h2>
								<button
									type="button"
									className="px-6 py-3 bg-white text-[#3C5F2D] font-medium rounded-2xl border-2 border-[#3C5F2D] hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										role="img"
										aria-label="Adicionar Novo"
									>
										<title>Adicionar Novo</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									Adicionar Novo
								</button>
							</div>

							<div className="space-y-4">
								{primaryAddress ? (
									<div className="p-4 border-2 border-[#3C5F2D] rounded-2xl bg-[#f7faf5]">
										<div className="flex items-start justify-between">
											<div className="space-y-1">
												<p className="text-lg font-medium text-black">
													{primaryAddress.street}, {primaryAddress.number}
												</p>
												{primaryAddress.complement && (
													<p className="text-gray-600">
														{primaryAddress.complement}
													</p>
												)}
												<p className="text-gray-600">
													{primaryAddress.city} - {primaryAddress.state}
												</p>
												<p className="text-gray-600">
													CEP: {primaryAddress.zipCode}
												</p>
											</div>
											<span className="px-3 py-1 bg-[#3C5F2D] text-white text-xs font-semibold rounded-full">
												Principal
											</span>
										</div>
									</div>
								) : (
									<p className="text-gray-500 italic">
										Nenhum endereço cadastrado.
									</p>
								)}
							</div>
						</div>

						{/* Card de Segurança */}
						<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
							<h2 className="text-2xl font-bold text-[#3C5F2D] mb-6">
								Segurança
							</h2>
							<button
								type="button"
								className="w-full md:w-auto px-6 py-3 bg-white text-black font-medium rounded-2xl border-2 border-[#3C5F2D] hover:bg-[#3C5F2D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-label="Segurança"
								>
									<title>Segurança</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
								Alterar Senha
							</button>
						</div>
					</div>
				)}

				{activeTab === 'orders' && (
					<div className="space-y-6">
						{userData.orders?.map((order) => (
							<div
								key={order.id}
								className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-[#3C5F2D] mb-1">
											Pedido #{order.id.slice(0, 8)}
										</h3>
										<p className="text-gray-600">
											Realizado em{' '}
											{new Date(order.createdAt).toLocaleDateString('pt-BR')}
										</p>
									</div>
									<span
										className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(
											order.status,
										)} w-fit`}
									>
										{translateStatus(order.status)}
									</span>
								</div>

								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t-2 border-gray-100">
									<div>
										<p className="text-sm text-gray-600 mb-1">Status</p>
										<p className="text-lg font-semibold">
											{translateStatus(order.status)}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-600 mb-1">Total</p>
										<p className="text-lg font-semibold text-[#3C5F2D]">
											R$ {Number(order.totalPrice).toFixed(2)}
										</p>
									</div>
									<div className="col-span-2 md:col-span-1 flex items-end">
										<button
											type="button"
											className="w-full px-4 py-2 bg-white text-[#3C5F2D] font-medium rounded-xl border-2 border-[#3C5F2D] hover:bg-[#3C5F2D] hover:text-white transition-all duration-300"
										>
											Ver Detalhes
										</button>
									</div>
								</div>
							</div>
						))}

						{(!userData.orders || userData.orders.length === 0) && (
							<div className="bg-white rounded-2xl shadow-lg p-12 text-center">
								<svg
									className="w-16 h-16 mx-auto mb-4 text-gray-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									role="img"
									aria-label="Nenhum pedido encontrado"
								>
									<title>Nenhum pedido encontrado</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
								<h3 className="text-xl font-bold text-gray-600 mb-2">
									Nenhum pedido encontrado
								</h3>
								<p className="text-gray-500 mb-6">
									Você ainda não realizou nenhuma compra.
								</p>
								<button
									type="button"
									onClick={() => router.push('/pages/products')}
									className="px-6 py-3 bg-[#3C5F2D] text-white font-medium rounded-2xl hover:bg-[#2d4722] transition-all duration-300 shadow-lg hover:shadow-xl"
								>
									Ir para Produtos
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
