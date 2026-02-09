'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const fruitImages = [
	'/Fruta_01.png',
	'/Fruta_02.png',
	'/Fruta_03.png',
	'/Fruta_04.png',
];

interface FruitPosition {
	id: number;
	x: number;
	y: number;
	rotation: number;
	scale: number;
	fruitIndex: number;
}

export default function BackgroundFruits() {
	const [fruitPositions, setFruitPositions] = useState<FruitPosition[]>([]);

	useEffect(() => {
		const count = 15;
		const newPositions: FruitPosition[] = [];

		for (let i = 0; i < count; i++) {
			newPositions.push({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				rotation: Math.random() * 360,
				scale: 0.5 + Math.random() * 1.0,
				fruitIndex: Math.floor(Math.random() * fruitImages.length),
			});
		}
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setFruitPositions(newPositions);
	}, []);

	return (
		<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-linear-to-br from-[#a5c893] to-[#8fb377]">
			{fruitPositions.map((pos) => (
				<div
					key={pos.id}
					className="absolute opacity-15"
					style={{
						left: `${pos.x}%`,
						top: `${pos.y}%`,
						transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
						width: '80px',
						height: '80px',
					}}
				>
					<Image
						src={fruitImages[pos.fruitIndex]}
						alt=""
						fill
						sizes="80px"
						loading="eager"
						className="object-contain"
					/>
				</div>
			))}
		</div>
	);
}
