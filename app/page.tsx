'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { LenisProvider } from './lenis-provider';

export default function Page() {
	return (
		<LenisProvider>
			<div>
				<div className='relative pt-[120px] not-only:px-[32px]'>
					{/** Title & Bottom Line */}
					<TopText />
					<div className='relative'>
						<p className='font-display pointer-events-none flex justify-between px-[32px] text-[16vw] uppercase'>
							<span className='-tracking-[10px]'>Blood</span>
							<span className='-tracking-[10px]'>Bath</span>
						</p>
						<BottomLine />
					</div>

					<div className='absolute top-[320px] left-[45vw] aspect-[430/415] h-[415px] object-cover p-[32px]'>
						<Image src='/img.jpg' alt='Blood Bath' width={430} height={415} />
					</div>
					<MiddleContent />
					<BottomContent />
				</div>
			</div>
		</LenisProvider>
	);
}

const BottomLine = () => {
	const path = useRef<SVGPathElement>(null);
	let progress = 0;
	let time = Math.PI / 2;
	let reqId: number | null = null;
	let x = 0.5;
	const LERP = (x: number, y: number, t: number) => x * (1 - t) + y * t;

	useEffect(() => {
		setPath(progress);
	}, [progress]);

	const setPath = (value: number) => {
		const { innerWidth } = window;
		path.current?.setAttribute(
			'd',
			`M0 250 Q${innerWidth * x} ${250 + value}, ${innerWidth} 250`
		);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { movementY, clientX } = e;
		console.log(movementY);
		const { width } = path.current?.getBoundingClientRect() || {
			width: 0,
		};
		x = clientX / width;
		progress += movementY;
		setPath(progress);
	};

	const animateOut = () => {
		const newProgress = Math.sin(time) * progress;
		time += 0.2;
		setPath(newProgress);
		progress = LERP(progress, 0, 0.025);
		if (Math.abs(progress) > 0.75) {
			reqId = window.requestAnimationFrame(animateOut);
		} else {
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		time = Math.PI / 2;
		progress = 0;
	};

	const handleMouseLeave = () => {
		animateOut();
	};

	const handleMouseEnter = () => {
		if (reqId !== null) {
			window.cancelAnimationFrame(reqId);
			resetAnimation();
		}
	};
	return (
		<div className='line relative bottom-[40px] mb-[20px] h-[1px] w-[100%]'>
			<div
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
				className='box absolute top-[-20px] left-0 z-10 h-[40px] w-full hover:top-[-250px] hover:h-[500px]'
			/>
			<svg className='absolute top-[-250px] w-full' height='500'>
				<path ref={path} fill='none' stroke='white' strokeWidth='1' />
			</svg>
		</div>
	);
};

const TopText = () => {
	return (
		<>
			<div className='absolute top-[32px] left-[32px] text-[14px] uppercase'>
				<p className='text-white'>(1969-1998)</p>
			</div>
			<div className='absolute top-[32px] right-[32px] text-[14px] uppercase'>
				<p className='text-white'>Only in Theaters</p>
			</div>
		</>
	);
};

const MiddleContent = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['100px', '500px'],
	});

	const path = useRef<SVGPathElement>(null);
	const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

	return (
		<div
			ref={ref}
			className='grid w-full grid-cols-12 gap-[20px] px-[32px] pt-[240px] font-sans text-2xl font-[500] break-words text-[#D33900]'
		>
			<p className='col-span-4'>
				The conflict began during a campaign by the Northern Ireland Civil
				Rights Association to end discrimination against the
				Catholic-nationalist minority by the Protestant-unionist government and
				local authorities.
			</p>
			<svg
				width='843'
				height='486'
				viewBox='0 0 843 486'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='col-span-7 col-start-4'
			>
				<motion.path
					ref={path}
					style={{ pathLength }}
					d='M1 1C21.1619 108.382 140.867 305.631 458.392 235.572C775.917 165.513 846.301 372.666 841.802 485'
					stroke='white'
				/>
			</svg>
		</div>
	);
};

const BottomContent = () => {
	const ref = useRef<SVGPathElement>(null);
	const isInView = useInView(ref, {
		once: true,
	});
	return (
		<div className='grid grid-cols-12 gap-[20px] px-[32px] pt-[40px] pb-[300px] font-sans text-[40px] font-[500] break-words text-[#D33900]'>
			<p className='col-span-6 col-start-7 leading-[40px]'>
				The police, the Royal Ulster Constabulary (RUC), were overwhelmingly
				Protestant and known for sectarianism and{' '}
				<span className='relative whitespace-nowrap'>
					police brutality.
					<svg
						viewBox='0 0 393 78'
						fill='none'
						className='absolute inset-[-10px] top-[1px]'
					>
						<motion.path
							ref={ref}
							animate={{
								pathLength: isInView ? 1 : 0,
							}}
							transition={{
								duration: 1.2,
								ease: [0.76, 0, 0.24, 1],
								delay: 0.5,
							}}
							d='M25.7393 60.5779C151.143 74.7628 399.713 90.1145 390.765 38.0426C379.579 -27.0472 -224.569 2.30334 95.3419 76'
							stroke='white'
							className='opacity-[0.5]'
							strokeWidth='5'
						/>
					</svg>
				</span>
			</p>
		</div>
	);
};
