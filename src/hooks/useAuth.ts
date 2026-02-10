'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn, signOut, signUp } from '@/src/services/auth';
import type { Register } from '@/src/types/auth';

export function useSignIn() {
	const router = useRouter();
	return useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			signIn(data, router, () => {}),
	});
}

export function useSignUp() {
	const router = useRouter();
	return useMutation({
		mutationFn: (data: Register) => signUp(data, router, () => {}),
	});
}

export function useSignOut() {
	const router = useRouter();
	return useMutation({
		mutationFn: () => signOut(router),
	});
}
