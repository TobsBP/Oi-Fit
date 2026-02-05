import { api } from '../lib/api/fetch';
import { supabase } from '../lib/supabase';
import type { User } from '../types/user';
import { getAddresses } from './addresses';

export async function getUser(): Promise<User | null> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) return null;

	try {
		const [userRes, addresses] = await Promise.all([
			api.get(`/user/${session.user.id}`, {
				headers: { Authorization: `Bearer ${session.access_token}` },
			}),
			getAddresses().catch(() => []),
		]);

		return { ...userRes.data, addresses };
	} catch (_error) {
		return null;
	}
}
