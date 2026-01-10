export const translateStatus = (status: string) => {
	const statuses: Record<string, string> = {
		PENDING: 'Pendente',
		PAID: 'Pago',
		SHIPPED: 'Enviado',
		DELIVERED: 'Entregue',
		CANCELED: 'Cancelado',
		RETURNED: 'Devolvido',
	};
	return statuses[status] || status;
};
