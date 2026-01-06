'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const heroSlides = [
		{
			title: 'Vista o Movimento',
			subtitle: 'Criado com propósito, pensado para o seu treino',
			image: '/Logo.jpg',
		},
		{
			title: 'Performance Máxima',
			subtitle: 'Tecnologia e conforto em cada peça',
			image: '/Adesivo2.jpg',
		},
		{
			title: 'Estilo Ativo',
			subtitle: 'Do treino para o dia a dia',
			image: '/Adesivo_Frutas_00.jpg',
		},
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000);
		return () => clearInterval(timer);
	});

	const categories = [
		{ name: 'Tops', icon: '👕', color: 'from-[#3C5F2D] to-[#4a7338]' },
		{ name: 'Calças', icon: '👖', color: 'from-[#4a7338] to-[#5a8348]' },
	];

	const features = [
		{
			icon: (
				<svg
					aria-hidden="true"
					className="w-8 h-8"
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
			),
			title: 'Alta Performance',
			description: 'Materiais tecnológicos que acompanham seu ritmo',
		},
		{
			icon: (
				<svg
					aria-hidden="true"
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
			),
			title: 'Conforto Total',
			description: 'Tecidos que respiram e se adaptam ao seu corpo',
		},
		{
			icon: (
				<svg
					aria-hidden="true"
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
					/>
				</svg>
			),
			title: 'Design Exclusivo',
			description: 'Estilo único que destaca você em qualquer lugar',
		},
		{
			icon: (
				<svg
					aria-hidden="true"
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
			title: 'Qualidade Garantida',
			description: 'Produtos duráveis que resistem aos treinos mais intensos',
		},
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section com Carousel */}
			<section className="relative h-screen overflow-hidden">
				{heroSlides.map((slide, index) => (
					<div
						key={slide.title}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							currentSlide === index ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Image
							src={slide.image}
							alt={slide.title}
							fill
							className="object-cover"
							priority={index === 0}
						/>
						<div className="absolute inset-0 bg-linear-to-r from-[#3C5F2D]/90 to-[#3C5F2D]/50 z-10"></div>
					</div>
				))}

				<div className="relative z-20 h-full flex items-center justify-center px-4">
					<div className="text-center max-w-4xl">
						<div className="mb-8 animate-fade-in">
							<div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white font-semibold mb-6">
								Bem-vindo à Oi-Fit
							</div>
						</div>
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
							{heroSlides[currentSlide].title}
						</h1>
						<p className="text-xl md:text-2xl text-white/90 mb-12 animate-slide-up">
							{heroSlides[currentSlide].subtitle}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
							<Link
								href="/pages/products"
								className="bg-white text-[#3C5F2D] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#a5c893] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
							>
								Explorar Produtos
							</Link>
							<Link
								href="/pages/about"
								className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#3C5F2D] transform hover:scale-105 transition-all duration-300"
							>
								Sobre Nós
							</Link>
						</div>
					</div>
				</div>

				{/* Indicadores do Carousel */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
					{heroSlides.map((slide, index) => (
						<button
							type="button"
							key={slide.title}
							onClick={() => setCurrentSlide(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
							}`}
						/>
					))}
				</div>

				{/* Scroll Indicator */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block mt-20">
					<svg
						aria-hidden="true"
						className="w-6 h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</section>

			{/* Categorias */}
			<section className="py-20 px-4 bg-linear-to-b from-white to-[#f5f5f5]">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-[#3C5F2D] mb-4">
							Nossas Categorias
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Descubra a coleção perfeita para o seu estilo de vida ativo
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{categories.map((category, _index) => (
							<Link
								key={category.name}
								href={`/products?category=${category.name.toLowerCase()}`}
								className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
							>
								<div
									className={`bg-linear-to-br ${category.color} p-12 text-center`}
								>
									<div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
										{category.icon}
									</div>
									<h3 className="text-3xl font-bold text-white mb-4">
										{category.name}
									</h3>
									<div className="flex items-center justify-center gap-2 text-white/90 group-hover:gap-4 transition-all duration-300">
										<span className="font-semibold">Explorar</span>
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-20 px-4 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-[#3C5F2D] mb-4">
							Por Que Escolher a Oi-Fit?
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Mais do que roupas, oferecemos uma experiência completa para seu
							estilo de vida
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, _index) => (
							<div
								key={feature.title}
								className="bg-linear-to-br from-[#a5c893]/20 to-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#a5c893]/30"
							>
								<div className="bg-[#3C5F2D] text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
									{feature.icon}
								</div>
								<h3 className="text-xl font-bold text-[#3C5F2D] mb-3">
									{feature.title}
								</h3>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 px-4 bg-linear-to-br from-[#3C5F2D] to-[#4a7338]">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Pronto para Começar Sua Jornada?
					</h2>
					<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
						Junte-se a milhares de atletas que confiam na Oi-Fit para alcançar
						seus objetivos
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/pages/register"
							className="bg-white text-[#3C5F2D] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#a5c893] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
						>
							Criar Conta Grátis
						</Link>
						<Link
							href="/page/products"
							className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#3C5F2D] transform hover:scale-105 transition-all duration-300"
						>
							Ver Produtos
						</Link>
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="py-20 px-4 bg-[#f5f5f5]">
				<div className="max-w-3xl mx-auto text-center">
					<div className="bg-white rounded-3xl shadow-xl p-10">
						<div className="bg-[#3C5F2D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
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
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h3 className="text-3xl font-bold text-[#3C5F2D] mb-4">
							Fique Por Dentro
						</h3>
						<p className="text-black mb-8">
							Receba novidades, promoções exclusivas e dicas de treino direto no
							seu email
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<input
								type="email"
								placeholder="seu@email.com"
								className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-[#3C5F2D] focus:outline-none transition-colors"
							/>
							<button
								type="button"
								className="bg-[#3C5F2D] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4a7338] transform hover:scale-105 transition-all duration-300 shadow-lg"
							>
								Inscrever
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
