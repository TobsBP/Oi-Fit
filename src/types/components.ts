import type { Product } from './products';
import type { SalesStats } from './sales.js';

export interface DashboardStatsProps {
	stats: SalesStats | null;
	loading: boolean;
}

export interface OverviewProps {
	monthlyRevenue: {
		month: string;
		revenue: number;
		orders: number;
	}[];
	loading: boolean;
}

export interface RecentSalesProps {
	recentOrders: {
		id: string;
		status: string;
		totalPrice: number;
		quantity: number;
		productId: string;
		createdAt: string;
	}[];
	loading: boolean;
}

export interface AddToCartButtonProps {
	product: Product;
	className?: string;
	selectedSize?: string;
	selectedColor?: string;
}

export interface AddressFormProps {
	onSuccess: () => void;
	onCancel: () => void;
}
