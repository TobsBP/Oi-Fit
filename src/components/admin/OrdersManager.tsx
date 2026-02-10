'use client';

import { useState } from 'react';
import { useOrders, useUpdateDelivery } from '@/src/hooks/useOrders';
import { useUsers } from '@/src/hooks/useUsers';
import { getStatusColor } from '@/src/utils/StatusColor';
import { translateStatus } from '@/src/utils/TranslateStatus';

export default function OrdersManager() {
	const { orders = [], isLoading } = useOrders();
	const { users = [], isLoading: usersLoading } = useUsers();
	const updateDelivery = useUpdateDelivery();

	const usersMap = new Map(users.map((u) => [u.id, u]));
	const [editingId, setEditingId] = useState<string | null>(null);
	const [viewingId, setViewingId] = useState<string | null>(null);
	const [deliveryText, setDeliveryText] = useState('');

	if (isLoading || usersLoading) {
		return (
			<div className="flex justify-center py-12">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3C5F2D]" />
			</div>
		);
	}

	const viewingOrder = orders.find((o) => o.id === viewingId);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold text-[#3C5F2D]">Gerenciar Pedidos</h3>
				<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3C5F2D]/10 text-[#3C5F2D] text-sm font-semibold rounded-full">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>Pedido</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
					{orders.length} pedido{orders.length !== 1 ? 's' : ''}
				</span>
			</div>

			<div className="bg-white rounded-xl border border-[#3C5F2D]/20 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-[#3C5F2D]/5 text-[#3C5F2D] font-bold uppercase text-xs">
							<tr>
								<th className="px-6 py-3">Pedido</th>
								<th className="px-6 py-3">Cliente</th>
								<th className="px-6 py-3">Telefone</th>
								<th className="px-6 py-3">Cidade</th>
								<th className="px-6 py-3">Qtd</th>
								<th className="px-6 py-3">Total</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3">Entrega</th>
								<th className="px-6 py-3">Data</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{orders.map((order) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 font-medium text-gray-900">
										#{order.id.slice(0, 8)}
									</td>
									<td className="px-6 py-4 text-gray-700">
										{usersMap.get(order.userId)?.name || '-'}
									</td>
									<td className="px-6 py-4 text-gray-500">
										{usersMap.get(order.userId)?.phone || '-'}
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
										<div className="flex items-center gap-1.5">
											{order.delivery ? (
												<button
													type="button"
													onClick={() => setViewingId(order.id)}
													className="truncate max-w-24 text-[#3C5F2D] hover:underline cursor-pointer text-left"
													title="Ver entrega"
												>
													{order.delivery}
												</button>
											) : (
												<span className="text-gray-300">—</span>
											)}
											<button
												type="button"
												onClick={() => {
													setEditingId(order.id);
													setDeliveryText(order.delivery || '');
												}}
												className="text-gray-400 hover:text-[#3C5F2D] transition-colors shrink-0"
												title="Editar entrega"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<title>Delivery</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
											</button>
										</div>
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

			{/* Modal visualizar entrega */}
			{viewingOrder && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-bold text-[#3C5F2D]">
								Entrega — #{viewingOrder.id.slice(0, 8)}
							</h2>
							<button
								type="button"
								onClick={() => setViewingId(null)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Orders</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="bg-[#f7faf5] rounded-xl p-4 border border-[#3C5F2D]/20">
							<div className="flex items-start gap-3">
								<svg
									className="w-5 h-5 text-[#3C5F2D] mt-0.5 shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Order</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
									/>
								</svg>
								<p className="text-gray-700 text-sm whitespace-pre-wrap">
									{viewingOrder.delivery}
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={() => setViewingId(null)}
							className="w-full mt-4 px-4 py-2.5 bg-[#3C5F2D] text-white font-medium text-sm rounded-xl hover:bg-[#2e4a22] transition-colors"
						>
							Fechar
						</button>
					</div>
				</div>
			)}

			{/* Modal editar entrega */}
			{editingId && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
						<h2 className="text-lg font-bold text-[#3C5F2D] mb-4">
							Informação de Entrega
						</h2>
						<textarea
							value={deliveryText}
							onChange={(e) => setDeliveryText(e.target.value)}
							className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3C5F2D] resize-none"
							rows={4}
							placeholder="Ex: Enviado via Sedex, código de rastreio AB123456789BR"
						/>
						<div className="flex justify-end gap-3 mt-4">
							<button
								type="button"
								onClick={() => setEditingId(null)}
								className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium text-sm rounded-xl border border-gray-300 hover:border-gray-400 transition-colors"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={() => {
									updateDelivery.mutate(
										{ orderId: editingId, delivery: deliveryText },
										{ onSuccess: () => setEditingId(null) },
									);
								}}
								disabled={updateDelivery.isPending}
								className="px-4 py-2 bg-[#3C5F2D] text-white font-medium text-sm rounded-xl hover:bg-[#2e4a22] transition-colors disabled:opacity-50"
							>
								{updateDelivery.isPending ? 'Salvando...' : 'Salvar'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
