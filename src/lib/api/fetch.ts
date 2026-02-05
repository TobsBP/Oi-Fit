import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log('Unauthorized - attempting to refresh token...');

			try {
				return api(originalRequest);
			} catch (refreshError: unknown) {
				console.error('Failed to refresh token:', refreshError);
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
