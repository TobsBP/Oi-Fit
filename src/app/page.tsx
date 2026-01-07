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

	return (
		<div className="min-h-screen">
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
			</section>
		</div>
	);
}
