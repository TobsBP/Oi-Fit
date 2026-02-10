'use client';

import { useState } from 'react';
import { PREDEFINED_CITIES } from '@/src/data/cities';
import { useCreateAddress, useFetchCep } from '@/src/hooks/useAddresses';
import type { AddressFormProps } from '@/src/types/components';

export default function AddressForm({ onSuccess, onCancel }: AddressFormProps) {
	const createAddressMutation = useCreateAddress();
	const fetchCepMutation = useFetchCep();
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		street: '',
		number: '',
		complement: '',
		neighborhood: '',
		city: '',
		state: '',
		zipCode: '',
	});

	const loading = createAddressMutation.isPending;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		if (name === 'city') {
			const selectedCity = PREDEFINED_CITIES.find((c) => c.name === value);
			if (selectedCity) {
				setFormData((prev) => ({
					...prev,
					city: selectedCity.name,
					state: selectedCity.state,
					zipCode: selectedCity.zipCode,
				}));
			} else {
				setFormData((prev) => ({ ...prev, city: value }));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleBlurCep = async () => {
		try {
			const data = await fetchCepMutation.mutateAsync(formData.zipCode);
			if (data) {
				setFormData((prev) => ({
					...prev,
					street: data.logradouro,
					neighborhood: data.bairro,
					city: data.localidade,
					state: data.uf,
				}));
			}
		} catch (error) {
			console.error('Error fetching CEP:', error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			await createAddressMutation.mutateAsync(formData);
			onSuccess();
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Ocorreu um erro desconhecido');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
					{error}
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Cidade
					</label>
					<select
						id="city"
						name="city"
						value={formData.city}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all bg-white text-gray-900"
						required
					>
						<option value="">Selecione uma cidade</option>
						{PREDEFINED_CITIES.map((city) => (
							<option key={city.name} value={city.name}>
								{city.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="zipCode"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						CEP
					</label>
					<input
						id="zipCode"
						type="text"
						name="zipCode"
						value={formData.zipCode}
						onChange={handleChange}
						onBlur={handleBlurCep}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all"
						required
						placeholder="00000-000"
					/>
				</div>

				<div className="md:col-span-2">
					<label
						htmlFor="street"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Rua
					</label>
					<input
						id="street"
						type="text"
						name="street"
						value={formData.street}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all"
						required
						placeholder="Nome da rua"
					/>
				</div>

				<div>
					<label
						htmlFor="number"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Número
					</label>
					<input
						id="number"
						type="text"
						name="number"
						value={formData.number}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all"
						required
						placeholder="123"
					/>
				</div>

				<div>
					<label
						htmlFor="complement"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Complemento
					</label>
					<input
						id="complement"
						type="text"
						name="complement"
						value={formData.complement}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all"
						placeholder="Apto, Bloco, etc."
					/>
				</div>

				<div>
					<label
						htmlFor="neighborhood"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Bairro
					</label>
					<input
						id="neighborhood"
						type="text"
						name="neighborhood"
						value={formData.neighborhood}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all"
						required
						placeholder="Bairro"
					/>
				</div>

				<div>
					<label
						htmlFor="state"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Estado (Sigla)
					</label>
					<input
						id="state"
						type="text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						maxLength={2}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C5F2D] focus:border-transparent outline-none transition-all uppercase"
						required
						placeholder="UF"
					/>
				</div>
			</div>

			<div className="flex gap-3 pt-4">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
					disabled={loading}
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={loading}
					className="flex-1 px-4 py-2 bg-[#3C5F2D] text-white font-medium rounded-lg hover:bg-[#2d4722] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
				>
					{loading ? (
						<>
							<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
							Salvando...
						</>
					) : (
						'Salvar Endereço'
					)}
				</button>
			</div>
		</form>
	);
}
