'use client';

import { useOrders } from '@/src/hooks/useOrders';
import { getStatusColor } from '@/src/utils/StatusColor';
import { translateStatus } from '@/src/utils/TranslateStatus';

export default function OrdersManager() {
	const { orders = [], isLoading } = useOrders();

	if (isLoading) {
		return (
			<div className="flex justify-center py-12">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3C5F2D]" />
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold text-[#3C5F2D]">Gerenciar Pedidos</h3>
				<span className="text-sm text-gray-500">
					{orders.length} pedido{orders.length !== 1 ? 's' : ''}
				</span>
			</div>

			<div className="bg-white rounded-xl border border-[#3C5F2D]/20 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-[#3C5F2D]/5 text-[#3C5F2D] font-bold uppercase text-xs">
							<tr>
								<th className="px-6 py-3">Pedido</th>
								<th className="px-6 py-3">Cidade</th>
								<th className="px-6 py-3">Qtd</th>
								<th className="px-6 py-3">Total</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3">Data</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{orders.map((order) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 font-medium text-gray-900">
										#{order.id.slice(0, 8)}
									</td>
									<td className="px-6 py-4 text-gray-500">
										{order.shippingAddress?.cityName || '-'}
									</td>
									<td className="px-6 py-4 text-gray-500">
										{order.quantity ?? '-'}
									</td>
									<td className="px-6 py-4 font-medium text-[#3C5F2D]">
										R$ {Number(order.totalPrice).toFixed(2).replace('.', ',')}
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
										>
											{translateStatus(order.status)}
										</span>
									</td>
									<td className="px-6 py-4 text-gray-500">
										{new Date(order.createdAt).toLocaleDateString('pt-BR')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{orders.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						Nenhum pedido encontrado.
					</div>
				)}
			</div>
		</div>
	);
}
