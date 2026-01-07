export default function DashboardStats() {
	const stats = [
		{
			name: 'Receita Total',
			value: 'R$ 45.231,89',
			change: '+20.1% em relação ao mês passado',
			changeType: 'positive',
		},
		{
			name: 'Pedidos',
			value: '+2350',
			change: '+180.1% em relação ao mês passado',
			changeType: 'positive',
		},
		{
			name: 'Ativos Agora',
			value: '+573',
			change: '+201 na última hora',
			changeType: 'positive',
		},
		{
			name: 'Produtos em Estoque',
			value: '12',
			change: '-2 desde ontem',
			changeType: 'negative',
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<div
					key={stat.name}
					className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm p-6 bg-white hover:border-[#3C5F2D] transition-colors duration-300"
				>
					<div className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="tracking-tight text-sm font-medium text-gray-500">
							{stat.name}
						</h3>
					</div>
					<div className="text-2xl font-bold text-[#3C5F2D]">{stat.value}</div>
					<p className="text-xs text-gray-500 mt-1">{stat.change}</p>
				</div>
			))}
		</div>
	);
}
