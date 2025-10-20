import { div } from 'framer-motion/client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Page() {
	useEffect(() => {
		getPath();
	}, []);
	const getPath = () => {
		const width = window.innerWidth;
	}
  return (
    <div>
      <div className='relative pt-[120px] not-only:px-[32px]'>
        <div className='absolute top-[32px] left-[32px] text-[14px] uppercase'>
          <p>(1969-1998)</p>
        </div>
        {/** Title & Bottom Line */}
        <div className='relative'>
          <p className='font-display flex justify-between text-[16vw] uppercase'>
            <span>Blood</span>
            <span>Bath</span>
          </p>
		  <svg>

		  </svg>
          <BottomLine />
        </div>

        <div className='absolute top-[320px] left-[45vw] aspect-[430/415] h-[415px] object-cover p-[32px]'>
          <Image src='/img.jpg' alt='Blood Bath' width={430} height={415} />
        </div>
      </div>
    </div>
  );
}

const BottomLine = () => {
  return (
    <svg
      className='absolute bottom-0 left-0'
      width='1512'
      height='1'
      viewBox='0 0 1512 1'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0.5H1512' />
    </svg>
  );
};
