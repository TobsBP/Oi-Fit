export const translateStatus = (status: string) => {
	const statuses: Record<string, string> = {
		PENDING: 'Pendente',
		pending: 'Pendente',
		PAID: 'Pago',
		paid: 'Pago',
		SHIPPED: 'Enviado',
		shipped: 'Enviado',
		DELIVERED: 'Entregue',
		delivered: 'Entregue',
		CANCELED: 'Cancelado',
		canceled: 'Cancelado',
		RETURNED: 'Devolvido',
		returned: 'Devolvido',
	};
	return statuses[status] || status;
};
