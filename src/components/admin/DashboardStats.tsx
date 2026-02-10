import type { DashboardStatsProps } from '@/src/types/components';

export default function DashboardStats({
	stats,
	loading,
}: DashboardStatsProps) {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value / 100);

	const cards = stats
		? [
				{
					name: 'Receita Total',
					value: formatCurrency(stats.totalRevenue),
					subtitle: `Pendente: ${formatCurrency(stats.pendingRevenue)}`,
				},
				{
					name: 'Pedidos',
					value: String(stats.totalOrders),
					subtitle: `${stats.paidOrders} pagos · ${stats.pendingOrders} pendentes`,
				},
				{
					name: 'Itens Vendidos',
					value: String(stats.totalItemsSold),
					subtitle: `Ticket médio: ${formatCurrency(stats.averageOrderValue)}`,
				},
				{
					name: 'Saldo Stripe',
					value: formatCurrency(stats.stripeBalance.available),
					subtitle: `Pendente: ${formatCurrency(stats.stripeBalance.pending)}`,
				},
			]
		: [];

	if (loading) {
		return (
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{['sk-1', 'sk-2', 'sk-3', 'sk-4'].map((key) => (
					<div
						key={key}
						className="rounded-xl border border-[#3C5F2D]/20 bg-white p-6 animate-pulse"
					>
						<div className="h-4 bg-gray-200 rounded w-24 mb-3" />
						<div className="h-7 bg-gray-200 rounded w-32 mb-2" />
						<div className="h-3 bg-gray-200 rounded w-40" />
					</div>
				))}
			</div>
		);
	}

	if (!stats) {
		return (
			<div className="text-center text-gray-500 py-8">
				Erro ao carregar estatísticas.
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{cards.map((card) => (
				<div
					key={card.name}
					className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm p-6 bg-white hover:border-[#3C5F2D] transition-colors duration-300"
				>
					<div className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="tracking-tight text-sm font-medium text-gray-500">
							{card.name}
						</h3>
					</div>
					<div className="text-2xl font-bold text-[#3C5F2D]">{card.value}</div>
					<p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
				</div>
			))}
		</div>
	);
}
