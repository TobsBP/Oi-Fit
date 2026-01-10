import { type NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/src/lib/cloudinary';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Convert file to buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Upload to Cloudinary using a Promise wrapper
		const result = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: 'products', // Organize uploads in a folder
					},
					(error, result) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					},
				)
				.end(buffer);
		});

		return NextResponse.json({ url: result.secure_url });
	} catch (error) {
		console.error('Upload error:', error);
		return NextResponse.json(
			{ error: 'Failed to upload image' },
			{ status: 500 },
		);
	}
}
