import type { RecentSalesProps } from '@/src/types/components';

const statusLabels: Record<string, string> = {
	paid: 'Pago',
	pending: 'Pendente',
	cancelled: 'Cancelado',
	refunded: 'Reembolsado',
};

const statusColors: Record<string, string> = {
	paid: 'bg-green-100 text-green-700',
	pending: 'bg-yellow-100 text-yellow-700',
	cancelled: 'bg-red-100 text-red-700',
	refunded: 'bg-gray-100 text-gray-700',
};

export default function RecentSales({
	recentOrders,
	loading,
}: RecentSalesProps) {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value);

	const formatDate = (date: string) =>
		new Date(date).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'short',
		});

	if (loading) {
		return (
			<div className="rounded-xl border border-[#3C5F2D]/20 bg-white col-span-3 p-6 animate-pulse">
				<div className="h-5 bg-gray-200 rounded w-32 mb-2" />
				<div className="h-4 bg-gray-200 rounded w-48 mb-6" />
				<div className="space-y-6">
					{['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5'].map((key) => (
						<div key={key} className="flex items-center">
							<div className="h-9 w-9 rounded-full bg-gray-200" />
							<div className="ml-4 space-y-2 flex-1">
								<div className="h-4 bg-gray-200 rounded w-20" />
								<div className="h-3 bg-gray-200 rounded w-16" />
							</div>
							<div className="h-4 bg-gray-200 rounded w-20 ml-auto" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm bg-white col-span-3">
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="font-semibold leading-none tracking-tight text-[#3C5F2D]">
					Vendas Recentes
				</h3>
				<p className="text-sm text-gray-500">
					{recentOrders.length > 0
						? `Últimos ${recentOrders.length} pedidos`
						: 'Nenhum pedido recente'}
				</p>
			</div>
			<div className="p-6 pt-0">
				<div className="space-y-6">
					{recentOrders.map((order) => (
						<div key={order.id} className="flex items-center">
							<div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#3C5F2D]/10 items-center justify-center">
								<span className="font-medium text-[#3C5F2D] text-xs">
									{order.quantity}x
								</span>
							</div>
							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">
									Pedido #{order.id.slice(0, 8)}
								</p>
								<p className="text-xs text-gray-500">
									{formatDate(order.createdAt)}
								</p>
							</div>
							<div className="ml-auto flex items-center gap-3">
								<span
									className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}
								>
									{statusLabels[order.status] ?? order.status}
								</span>
								<span className="font-medium text-[#3C5F2D]">
									{formatCurrency(order.totalPrice)}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
