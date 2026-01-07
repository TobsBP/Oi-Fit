export default function Overview() {
	const data = [
		{ name: 'Jan', total: 2500 },
		{ name: 'Fev', total: 3200 },
		{ name: 'Mar', total: 1800 },
		{ name: 'Abr', total: 4100 },
		{ name: 'Mai', total: 2900 },
		{ name: 'Jun', total: 3500 },
		{ name: 'Jul', total: 4800 },
		{ name: 'Ago', total: 3100 },
		{ name: 'Set', total: 2200 },
		{ name: 'Out', total: 3900 },
		{ name: 'Nov', total: 4500 },
		{ name: 'Dez', total: 5100 },
	];

	const max = Math.max(...data.map((d) => d.total));

	return (
		<div className="rounded-xl border border-[#3C5F2D]/20 bg-card text-card-foreground shadow-sm bg-white col-span-4">
			<div className="flex flex-col space-y-1.5 p-6">
				<h3 className="font-semibold leading-none tracking-tight text-[#3C5F2D]">
					Visão Geral
				</h3>
				<p className="text-sm text-gray-500">Receita mensal</p>
			</div>
			<div className="p-6 pt-0 pl-2">
				<div className="flex items-end justify-between h-[350px] w-full gap-2">
					{data.map((item) => (
						<div
							key={item.name}
							className="flex flex-col items-center gap-2 w-full h-full justify-end group relative"
						>
							<div
								className="w-full bg-[#3C5F2D] rounded-t-md transition-all hover:opacity-80 relative"
								style={{ height: `${(item.total / max) * 100}%` }}
							>
								<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 shadow-lg">
									R${' '}
									{item.total.toLocaleString('pt-BR', {
										minimumFractionDigits: 2,
									})}
									<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
								</div>
							</div>
							<span className="text-xs text-gray-500">{item.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
