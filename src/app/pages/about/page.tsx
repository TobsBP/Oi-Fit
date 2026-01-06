export default function AboutPage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-[#a5c893] via-[#8fb377] to-[#7aa560] relative overflow-hidden">
			{/* Elementos decorativos de fundo */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-10 w-72 h-72 bg-[#3C5F2D] rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-12">
				{/* Container principal */}
				<div className="max-w-5xl w-full">
					{/* Header com logo/nome */}
					<div className="text-center mb-12">
						<h1 className="text-5xl md:text-6xl font-bold text-[#3C5F2D] mb-4">
							Sobre Nós
						</h1>
						<div className="w-24 h-1 bg-[#3C5F2D] mx-auto rounded-full"></div>
					</div>

					{/* Grid de conteúdo */}
					<div className="grid md:grid-cols-2 gap-8 mb-12">
						{/* Card principal */}
						<div className="md:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 transform hover:scale-[1.02] transition-all duration-300">
							<div className="flex items-start gap-4 mb-6">
								<div className="bg-[#3C5F2D] p-3 rounded-2xl">
									<svg
										aria-hidden="true"
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<div>
									<h2 className="text-2xl font-bold text-[#3C5F2D] mb-3">
										Nossa Missão
									</h2>
									<p className="text-lg text-gray-700 leading-relaxed">
										Bem-vindo à{' '}
										<span className="font-bold text-[#3C5F2D]">Oi-Fit</span>!
										Somos uma marca dedicada a fornecer roupas de alta qualidade
										para entusiastas de fitness e estilo de vida ativo. Nossa
										missão é inspirar e capacitar nossos clientes a alcançarem
										seus objetivos de saúde e bem-estar, oferecendo produtos que
										combinam conforto, funcionalidade e estilo.
									</p>
								</div>
							</div>
						</div>

						{/* Cards secundários */}
						<div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
							<div className="bg-[#3C5F2D] p-3 rounded-2xl w-fit mb-4">
								<svg
									aria-hidden="true"
									className="w-7 h-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M3 7h10v7h7l-2-5h-5" />
									<circle cx="7.5" cy="18" r="1.5" />
									<circle cx="17.5" cy="18" r="1.5" />
									<path d="M3 7v11h4" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-[#3C5F2D] mb-3">
								Entregamos
							</h3>
							<p className="text-gray-700 leading-relaxed">
								Ouro Fino, Inconfidentes, Borda da Mata, Pouso Alegre, Jacutinga
								e região.
							</p>
						</div>

						<div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
							<div className="flex gap-3">
								<div className="bg-[#3C5F2D] p-3 rounded-2xl w-fit mb-4 flex gap-4">
									<svg
										aria-hidden="true"
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect x="2" y="5" width="20" height="14" rx="2" />
										<path d="M2 10h20" />
										<path d="M7 15h3" />
									</svg>
								</div>
								<div className="bg-[#3C5F2D] p-3 rounded-2xl w-fit mb-4 flex gap-4">
									<svg
										aria-hidden="true"
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect x="2" y="6" width="20" height="12" rx="2" />
										<circle cx="12" cy="12" r="2.5" />
										<path d="M4 8c1 1 2 2 4 2M20 8c-1 1-2 2-4 2" />
										<path d="M4 16c1-1 2-2 4-2M20 16c-1-1-2-2-4-2" />
									</svg>
								</div>
								<div className="bg-[#3C5F2D] p-3 rounded-2xl w-fit mb-4 flex gap-4">
									<svg
										aria-hidden="true"
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M8 12l4-4 4 4-4 4-4-4z" />
										<path d="M4 12l4-4m8 8l4-4m-4-4L12 4 8 8" />
									</svg>
								</div>
							</div>
							<h3 className="text-xl font-bold text-[#3C5F2D] mb-3">
								Meios de Pagamento
							</h3>
							<p className="text-gray-700 leading-relaxed">
								Aceitamos cartões de crédito, débito e Pix.
							</p>
						</div>
					</div>

					{/* Slogan destacado */}
					<div className="bg-linear-to-r from-[#3C5F2D] to-[#4a7338] rounded-3xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-[1.02] transition-all duration-300">
						<svg
							aria-hidden="true"
							className="w-16 h-16 text-white mx-auto mb-6 opacity-80"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
						<p className="text-2xl md:text-3xl font-bold text-white italic leading-relaxed">
							Criado com propósito, pensado para o seu treino — vista o
							movimento.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
