export const getStatusColor = (status: string) => {
	switch (status.toUpperCase()) {
		case 'DELIVERED':
			return 'bg-green-100 text-green-800';
		case 'SHIPPED':
			return 'bg-blue-100 text-blue-800';
		case 'PAID':
			return 'bg-green-100 text-green-600';
		case 'PENDING':
			return 'bg-yellow-100 text-yellow-800';
		case 'CANCELED':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
