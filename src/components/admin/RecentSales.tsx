export default function RecentSales() {
	const sales = [
		{
			name: 'Olivia Martin',
			phone: '(11) 98765-4321',
			amount: 'R$ 1.999,00',
		},
		{
			name: 'Jackson Lee',
			phone: '(21) 99887-7665',
			amount: 'R$ 390,00',
		},
		{
			name: 'Isabella Nguyen',
			phone: '(31) 97766-5544',
			amount: 'R$ 299,00',
		},
		{
			name: 'William Kim',
			phone: '(41) 96655-4433',
			amount: 'R$ 990,00',
		},
		{
			name: 'Sofia Davis',
			phone: '(51) 95544-3322',
			amount: 'R$ 390,00',
		},
	];

	return (
		<div className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm bg-white col-span-3">
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="font-semibold leading-none tracking-tight text-[#3C5F2D]">
					Vendas Recentes
				</h3>
				<p className="text-sm text-gray-500">Você fez 265 vendas este mês.</p>
			</div>
			<div className="p-6 pt-0">
				<div className="space-y-8">
					{sales.map((sale) => (
						<div key={sale.phone} className="flex items-center">
							<div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#3C5F2D]/10 items-center justify-center">
								<span className="font-medium text-[#3C5F2D]">
									{sale.name.charAt(0)}
								</span>
							</div>
							<div className="ml-4 space-y-1">
								<p className="text-sm font-medium leading-none">{sale.name}</p>
								<p className="text-sm text-gray-500">{sale.phone}</p>
							</div>
							<div className="ml-auto font-medium text-[#3C5F2D]">
								{sale.amount}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
