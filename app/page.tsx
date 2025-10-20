'use client';

import { div } from 'framer-motion/client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Page() {
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let time = Math.PI / 2;
  let reqId: number | null = null;
  let x: number = 0;

	useEffect(() => {
		setPath(progress);
	}, [progress]);
  
	const setPath = (value: number) => {
		const { innerWidth } = window;
    path.current?.setAttribute('d', `M0 50 Q${(innerWidth / 2)} ${50 + value}, ${innerWidth} 50`);
	}

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { movementY } = e;
    progress += movementY;
    setPath(progress);
  }

  const handleMouseLeave = () => {
    animateOut();
  }

  const LERP = (x: number, y: number, t: number) =>  x * (1 - t) + y * t;

  const animateOut = () => {
    const newProgress = Math.sin(time) * progress;
    time += 0.2;
    setPath(newProgress);
    progress = LERP(progress, 0, 0.025);
    if (Math.abs(progress) > .75) {
      reqId = window.requestAnimationFrame(animateOut);
    }
    else {
      resetAnimation();
    }
  }
  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
    setPath(progress);
  } 

  const handleMouseEnter = () => {
    if (reqId !== null) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  }
  return (
    <div>
      <div className='relative pt-[120px] not-only:px-[32px]'>
        <div className='absolute top-[32px] left-[32px] text-[14px] uppercase'>
          <p>(1969-1998)</p>
        </div>
        {/** Title & Bottom Line */}
        <div className='relative'>
          <p className='font-display flex justify-between text-[16vw] uppercase pointer-events-none'>
            <span>Blood</span>
            <span>Bath</span>
          </p>
          <div className="line h-[1px] relative w-[100%] mb-[20px] bottom-[40px]">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className='box h-[40px]  absolute top-[-20px] left-0 w-full z-10 hover:h-[150px] hover:top-[-75px]' />
            <svg  className='absolute w-full top-[-50px]' height="100">
              <path ref={path} fill='none' stroke='white' strokeWidth='1' />
            </svg>  
          </div>
        </div>

        <div className='absolute top-[320px] left-[45vw] aspect-[430/415] h-[415px] object-cover p-[32px]'>
          <Image src='/img.jpg' alt='Blood Bath' width={430} height={415} />
        </div>
      </div>
    </div>
  );
}

const SvgTest = () => {
  return (

    <div className='border border-red-500 ml-[23px] w-[fit-content]'>
    <svg className='' width="190" height="160" fill='white' >

    </svg></div>
  )
}

const BottomLine = () => {
  return (
  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="Gradient1">
        <stop offset="5%" stopColor="white" />
        <stop offset="95%" stopColor="blue" />
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="5%" stopColor="red" />
        <stop offset="95%" stopColor="orange" />
      </linearGradient>

      <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
        <rect x="0" y="0" width="100" height="100" fill="skyblue" />
        <rect x="0" y="0" width="50" height="50" fill="url(#Gradient2)" />
        <circle cx="50" cy="50" r="40" fill="url(#Gradient1)" fillOpacity="0.5" />
      </pattern>
    </defs>

    <rect fill="url(#Pattern)" stroke="black" width="400" height="400" />
  </svg>
  );
};
