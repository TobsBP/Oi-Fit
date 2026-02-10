'use client';

import type React from 'react';
import { useState } from 'react';
import { useDeleteUser, useUpdateUser, useUsers } from '@/src/hooks/useUsers';
import type { ModalState } from '@/src/types/components';
import type { UserFormData, UserListItem } from '@/src/types/user';

function Modal({ modal, onClose }: { modal: ModalState; onClose: () => void }) {
	if (!modal.open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				type="button"
				className="fixed inset-0 bg-black/50 cursor-default"
				onClick={onClose}
				onKeyDown={(e) => e.key === 'Escape' && onClose()}
				aria-label="Fechar modal"
			/>
			<div className="relative bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
				<div className="flex items-start gap-3">
					{modal.type === 'error' ? (
						<div className="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Erro</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					) : (
						<div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
							<svg
								className="w-5 h-5 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Atenção</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					)}
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900">
							{modal.title}
						</h3>
						<p className="mt-1 text-sm text-gray-600">{modal.message}</p>
					</div>
				</div>
				<div className="flex justify-end gap-3 mt-6">
					{modal.type === 'confirm' ? (
						<>
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={() => {
									modal.onConfirm?.();
									onClose();
								}}
								className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
							>
								Remover
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-white bg-[#3C5F2D] rounded-md hover:bg-[#2d4721]"
						>
							Entendi
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default function UsersManager() {
	const { users, isLoading, error } = useUsers();
	const updateUser = useUpdateUser();
	const deleteUser = useDeleteUser();

	const [isEditing, setIsEditing] = useState<UserListItem | null>(null);
	const [formData, setFormData] = useState<UserFormData>({
		name: '',
		email: '',
		phone: '',
	});
	const [modal, setModal] = useState<ModalState>({
		open: false,
		type: 'error',
		title: '',
		message: '',
	});

	const closeModal = () => setModal((prev) => ({ ...prev, open: false }));

	const handleEdit = (user: UserListItem) => {
		setIsEditing(user);
		setFormData({
			name: user.name ?? '',
			email: user.email,
			phone: user.phone ?? '',
		});
	};

	const handleCancel = () => {
		setIsEditing(null);
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditing) return;

		try {
			await updateUser.mutateAsync({
				id: isEditing.id,
				data: {
					name: formData.name || undefined,
					email: formData.email || undefined,
					phone: formData.phone || undefined,
				},
			});
			setIsEditing(null);
		} catch (_error) {
			setModal({
				open: true,
				type: 'error',
				title: 'Erro ao atualizar',
				message: 'Não foi possível atualizar os dados do usuário.',
			});
		}
	};

	const confirmDelete = (user: UserListItem) => {
		setModal({
			open: true,
			type: 'confirm',
			title: 'Remover usuário',
			message: `Tem certeza que deseja remover ${user.name ?? user.email} permanentemente?`,
			onConfirm: () => handleDelete(user.id),
		});
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteUser.mutateAsync(id);
		} catch (error) {
			if (error instanceof Error && error.message === 'HAS_ORDERS') {
				setModal({
					open: true,
					type: 'error',
					title: 'Não é possível remover',
					message:
						'Este usuário possui pedidos registrados e não pode ser removido.',
				});
			} else {
				setModal({
					open: true,
					type: 'error',
					title: 'Erro ao remover',
					message: 'Não foi possível remover o usuário.',
				});
			}
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3C5F2D]"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12 text-red-600">
				Erro ao carregar usuários.
			</div>
		);
	}

	if (isEditing) {
		return (
			<>
				<Modal modal={modal} onClose={closeModal} />
				<div className="bg-white p-6 rounded-xl border border-[#3C5F2D]/20 shadow-sm">
					<h3 className="text-xl font-bold text-[#3C5F2D] mb-4">
						Editar Usuário
					</h3>
					<form onSubmit={handleSave} className="space-y-4">
						<div>
							<label
								htmlFor="user-name"
								className="block text-sm font-medium text-gray-700"
							>
								Nome
							</label>
							<input
								id="user-name"
								type="text"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
							/>
						</div>
						<div>
							<label
								htmlFor="user-email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								id="user-email"
								type="email"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
							/>
						</div>
						<div>
							<label
								htmlFor="user-phone"
								className="block text-sm font-medium text-gray-700"
							>
								Telefone
							</label>
							<input
								id="user-phone"
								type="text"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-[#3C5F2D] focus:outline-none focus:ring-1 focus:ring-[#3C5F2D]"
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
							/>
						</div>
						<div className="flex justify-end gap-3 pt-4">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={updateUser.isPending}
								className={`px-4 py-2 text-sm font-medium text-white bg-[#3C5F2D] rounded-md hover:bg-[#2d4721] ${
									updateUser.isPending ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							>
								{updateUser.isPending ? 'Salvando...' : 'Salvar'}
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}

	return (
		<>
			<Modal modal={modal} onClose={closeModal} />
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h3 className="text-xl font-bold text-[#3C5F2D]">
						Gerenciar Usuários
					</h3>
					<span className="text-sm text-gray-500">
						{users?.length ?? 0} usuário(s)
					</span>
				</div>

				<div className="bg-white rounded-xl border border-[#3C5F2D]/20 shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="bg-[#3C5F2D]/5 text-[#3C5F2D] font-bold uppercase text-xs">
								<tr>
									<th className="px-6 py-3">Nome</th>
									<th className="px-6 py-3">Email</th>
									<th className="px-6 py-3">Telefone</th>
									<th className="px-6 py-3">Cadastrado em</th>
									<th className="px-6 py-3 text-right">Ações</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{users?.map((user) => (
									<tr key={user.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 font-medium text-gray-900">
											{user.name ?? '—'}
										</td>
										<td className="px-6 py-4 text-gray-500">{user.email}</td>
										<td className="px-6 py-4 text-gray-500">
											{user.phone ?? '—'}
										</td>
										<td className="px-6 py-4 text-gray-500">
											{new Date(user.createdAt).toLocaleDateString('pt-BR')}
										</td>
										<td className="px-6 py-4 text-right space-x-2">
											<button
												type="button"
												onClick={() => handleEdit(user)}
												className="text-blue-600 hover:text-blue-800 font-medium"
											>
												Editar
											</button>
											<button
												type="button"
												onClick={() => confirmDelete(user)}
												disabled={deleteUser.isPending}
												className="text-red-600 hover:text-red-800 font-medium"
											>
												Remover
											</button>
										</td>
									</tr>
								))}
								{users?.length === 0 && (
									<tr>
										<td
											colSpan={5}
											className="px-6 py-8 text-center text-gray-400"
										>
											Nenhum usuário encontrado.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
