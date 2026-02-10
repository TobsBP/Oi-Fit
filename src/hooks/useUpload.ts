'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/src/services/uploads';

export function useUploadImage() {
	return useMutation({
		mutationFn: (file: File) => uploadImage(file),
	});
}
