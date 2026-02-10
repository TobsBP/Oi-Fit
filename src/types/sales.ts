import { z } from 'zod';

export const salesStatsSchema = z.object({
	totalOrders: z.number(),
	paidOrders: z.number(),
	pendingOrders: z.number(),
	totalRevenue: z.number(),
	pendingRevenue: z.number(),
	totalItemsSold: z.number(),
	averageOrderValue: z.number(),
	monthlyRevenue: z.array(
		z.object({
			month: z.string(),
			revenue: z.number(),
			orders: z.number(),
		}),
	),
	recentOrders: z.array(
		z.object({
			id: z.string(),
			status: z.string(),
			totalPrice: z.number(),
			quantity: z.number(),
			productId: z.string(),
			createdAt: z.string(),
		}),
	),
	stripeBalance: z.object({
		available: z.number(),
		pending: z.number(),
	}),
});

export type SalesStats = z.infer<typeof salesStatsSchema>;
