import type { OverviewProps } from '@/src/types/components';

export default function Overview({ monthlyRevenue, loading }: OverviewProps) {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value / 100);

	if (loading) {
		return (
			<div className="rounded-xl border border-[#3C5F2D]/20 bg-white col-span-4 p-6 animate-pulse">
				<div className="h-5 bg-gray-200 rounded w-32 mb-2" />
				<div className="h-4 bg-gray-200 rounded w-24 mb-6" />
				<div className="flex items-end justify-between h-87.5 gap-2">
					{['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6'].map((key) => (
						<div
							key={key}
							className="w-full flex flex-col items-center gap-2 justify-end h-full"
						>
							<div
								className="w-full bg-gray-200 rounded-t-md"
								style={{ height: `${30 + Math.random() * 50}%` }}
							/>
							<div className="h-3 bg-gray-200 rounded w-8" />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (monthlyRevenue.length === 0) {
		return (
			<div className="rounded-xl border border-[#3C5F2D]/20 bg-white col-span-4 p-6">
				<h3 className="font-semibold leading-none tracking-tight text-[#3C5F2D]">
					Visão Geral
				</h3>
				<p className="text-sm text-gray-500 mt-1">Receita mensal</p>
				<p className="text-center text-gray-400 py-12">Sem dados ainda.</p>
			</div>
		);
	}

	const max = Math.max(...monthlyRevenue.map((d) => d.revenue));

	return (
		<div className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm bg-white col-span-4">
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="font-semibold leading-none tracking-tight text-[#3C5F2D]">
					Visão Geral
				</h3>
				<p className="text-sm text-gray-500">Receita mensal</p>
			</div>
			<div className="p-6 pt-0 pl-2">
				<div className="flex items-end justify-between h-87.5 w-full gap-2">
					{monthlyRevenue.map((item) => (
						<div
							key={item.month}
							className="flex flex-col items-center gap-2 w-full h-full justify-end group relative"
						>
							<div
								className="w-full bg-[#3C5F2D] rounded-t-md transition-all hover:opacity-80 relative"
								style={{
									height: max > 0 ? `${(item.revenue / max) * 100}%` : '0%',
								}}
							>
								<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 shadow-lg">
									{formatCurrency(item.revenue)} · {item.orders} pedidos
									<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
								</div>
							</div>
							<span className="text-xs text-gray-500">{item.month}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
