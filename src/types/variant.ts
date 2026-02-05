import { z } from 'zod';

export const variantSchema = z.object({
	id: z.string(),
	product_id: z.string(),
	size: z.string(),
	color: z.string(),
	stock: z.string().nullable(),
	images: z.array(z.string()),
});

export type Variant = z.infer<typeof variantSchema>;
