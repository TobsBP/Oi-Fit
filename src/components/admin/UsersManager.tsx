'use client';

import { useState } from 'react';

interface User {
	id: number;
	name: string;
	phone: string;
	role: string;
	status: 'active' | 'blocked';
	lastActive: string;
}

const initialUsers: User[] = [
	{
		id: 1,
		name: 'Olivia Martin',
		phone: '(11) 98765-4321',
		role: 'Cliente',
		status: 'active',
		lastActive: '2 min atrás',
	},
	{
		id: 2,
		name: 'Jackson Lee',
		phone: '(21) 99887-7665',
		role: 'Cliente',
		status: 'blocked',
		lastActive: '2 dias atrás',
	},
	{
		id: 3,
		name: 'Isabella Nguyen',
		phone: '(31) 97766-5544',
		role: 'Admin',
		status: 'active',
		lastActive: '5 min atrás',
	},
	{
		id: 4,
		name: 'William Kim',
		phone: '(41) 96655-4433',
		role: 'Cliente',
		status: 'active',
		lastActive: '1 hora atrás',
	},
	{
		id: 5,
		name: 'Sofia Davis',
		phone: '(51) 95544-3322',
		role: 'Cliente',
		status: 'active',
		lastActive: '1 dia atrás',
	},
];

export default function UsersManager() {
	const [users, setUsers] = useState<User[]>(initialUsers);

	const handleBlock = (id: number) => {
		setUsers(
			users.map((user) => {
				if (user.id === id) {
					return {
						...user,
						status: user.status === 'active' ? 'blocked' : 'active',
					};
				}
				return user;
			}),
		);
	};

	const handleRemove = (id: number) => {
		if (
			confirm('Tem certeza que deseja remover este usuário permanentemente?')
		) {
			setUsers(users.filter((u) => u.id !== id));
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold text-[#3C5F2D]">Gerenciar Usuários</h3>
			</div>

			<div className="bg-white rounded-xl border border-[#3C5F2D]/20 shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-[#3C5F2D]/5 text-[#3C5F2D] font-bold uppercase text-xs">
							<tr>
								<th className="px-6 py-3">Usuário</th>
								<th className="px-6 py-3">Telefone</th>
								<th className="px-6 py-3">Função</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3 text-right">Ações</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 font-medium text-gray-900">
										{user.name}
									</td>
									<td className="px-6 py-4 text-gray-500">{user.phone}</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												user.role === 'Admin'
													? 'bg-purple-100 text-purple-800'
													: 'bg-gray-100 text-gray-800'
											}`}
										>
											{user.role}
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												user.status === 'active'
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
											}`}
										>
											{user.status === 'active' ? 'Ativo' : 'Bloqueado'}
										</span>
									</td>
									<td className="px-6 py-4 text-right space-x-2">
										<button
											type="submit"
											onClick={() => handleBlock(user.id)}
											className={`font-medium ${user.status === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'}`}
										>
											{user.status === 'active' ? 'Bloquear' : 'Desbloquear'}
										</button>
										<button
											type="button"
											onClick={() => handleRemove(user.id)}
											className="text-red-600 hover:text-red-800 font-medium"
										>
											Remover
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
