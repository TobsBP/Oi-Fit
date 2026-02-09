'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardStats from '@/src/components/admin/DashboardStats';
import OrdersManager from '@/src/components/admin/OrdersManager';
import Overview from '@/src/components/admin/Overview';
import ProductsManager from '@/src/components/admin/ProductsManager';
import RecentSales from '@/src/components/admin/RecentSales';
import UsersManager from '@/src/components/admin/UsersManager';
import { supabase } from '@/src/lib/supabase';

export default function AdminPage() {
	const [activeTab, setActiveTab] = useState<
		'dashboard' | 'products' | 'orders' | 'users'
	>('dashboard');
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const checkAdmin = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user?.email !== 'useoifit@gmail.com') {
				router.push('/');
			} else {
				setLoading(false);
			}
		};

		checkAdmin();
	}, [router]);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3C5F2D]"></div>
			</div>
		);
	}

	return (
		<div className="flex-1 space-y-4 p-4 md:p-8 md:px-24 pt-24 pb-12">
			<div className="flex flex-col space-y-2">
				<h2 className="text-3xl font-bold tracking-tight text-[#3C5F2D]">
					Dashboard Administrativo
				</h2>
				<p className="text-gray-600">
					Bem-vindo de volta! Aqui está o resumo da sua loja hoje.
				</p>
			</div>

			{/* Navigation Tabs */}
			<div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6 w-fit">
				<button
					type="submit"
					onClick={() => setActiveTab('dashboard')}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						activeTab === 'dashboard'
							? 'bg-white text-[#3C5F2D] shadow-sm'
							: 'text-gray-500 hover:text-[#3C5F2D]'
					}`}
				>
					Visão Geral
				</button>
				<button
					type="submit"
					onClick={() => setActiveTab('products')}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						activeTab === 'products'
							? 'bg-white text-[#3C5F2D] shadow-sm'
							: 'text-gray-500 hover:text-[#3C5F2D]'
					}`}
				>
					Produtos
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('orders')}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						activeTab === 'orders'
							? 'bg-white text-[#3C5F2D] shadow-sm'
							: 'text-gray-500 hover:text-[#3C5F2D]'
					}`}
				>
					Pedidos
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('users')}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						activeTab === 'users'
							? 'bg-white text-[#3C5F2D] shadow-sm'
							: 'text-gray-500 hover:text-[#3C5F2D]'
					}`}
				>
					Usuários
				</button>
			</div>

			{/* Content Content */}
			<div className="space-y-4">
				{activeTab === 'dashboard' && (
					<>
						<DashboardStats />
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Overview />
							<RecentSales />
						</div>
					</>
				)}

				{activeTab === 'products' && <ProductsManager />}

				{activeTab === 'orders' && <OrdersManager />}

				{activeTab === 'users' && <UsersManager />}
			</div>
		</div>
	);
}
