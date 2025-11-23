'use client';

import { ThemeChangerButton } from '@/components/theme-changer-button';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/logo';

// import Image from 'next/image';
import { motion, Variants, useAnimate } from 'motion/react';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  //   NavbarButton,
} from '@/components/ui/resizable-navbar';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  useEffect(() => {
    function loadStartingAnimation() {
      document.body.classList.add('overflow-hidden');

      const nav = document.querySelector('[data-remove="hide"]');
      nav?.classList.add('hidden');
      window.scrollBy(0, -100000000000);

      const timer = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        document.querySelector('[data-remove="opening-animation"]')?.remove();
        nav?.classList.remove('hidden');
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
    function getCenterOfScreen() {
      setCenterX(window.innerWidth / 2);
      setCenterY(window.innerHeight / 2);
      console.log(centerX, centerY);
    }
    getCenterOfScreen();
    loadStartingAnimation();
  }, [centerX, centerY, setCenterX, setCenterY]);

  const navItems = [
    {
      name: 'Features',
      link: '#features',
    },
    {
      name: 'Pricing',
      link: '#pricing',
    },
    {
      name: 'Contact',
      link: '#contact',
    },
  ];

  return (
    <>
      {/* <header className="absolute w-full"> */}
      {/* navbar */}
      <div data-remove="hide">
        <Navbar className="h-full mt-2">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} className="text-md" />
            <div className="absolute top-0 right-0 z-50 flex gap-2 m-2 self-end">
              <Button variant="default">Log In/Register → </Button>
              <ThemeChangerButton />
            </div>
          </NavBody>
        </Navbar>
      </div>
      {/* </header> */}
      {/* The dark mode light mode button */}

      <div
        className="grid h-screen place-items-center bg-transparent"
        data-remove="opening-animation">
        <div className="animate-fade-in-out text-6xl text-black dark:text-white w-fit h-fit">
          <motion.svg
            initial="hidden"
            animate="visible"
            className={`absolute z-9999 w-fit h-fit`}
            width="886"
            height="886"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            <motion.circle
              transition={{ duration: 1.5 }}
              //   variants={draw}
              cx={443}
              cy={443}
              custom={1}
              r="300"
              stroke="#f1c02d"
              style={{
                strokeWidth: 50,
                strokeLinecap: 'round',
                fill: 'transparent',
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <motion.circle
              transition={{ duration: 2 }}
              //   variants={draw}
              cx={443}
              cy={443}
              custom={1}
              r="360"
              stroke="#f17e1a"
              style={{
                strokeWidth: 50,
                strokeLinecap: 'round',
                fill: 'transparent',
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <motion.circle
              transition={{ duration: 2.5 }}
              //   variants={draw}
              cx={443}
              cy={443}
              custom={1}
              r="418"
              stroke="#f13b47"
              style={{
                strokeWidth: 50,
                strokeLinecap: 'round',
                fill: 'transparent',
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          </motion.svg>
          <motion.div
            animate={{ scale: 50 }}
            transition={{ delay: 3.5, ease: 'easeOut' }}
            className="flex justify-center items-center">
            <Logo size={72} />
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col min-h-screen w-screen ">
        <motion.h1 className="text-5xl font-semibold tracking-tight text-balance text-black dark:text-white md:text-6xl">
          {' '}
          {/* initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.47}} */}
          Smart Energy Adapter
        </motion.h1>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Our HEMS is the HEMS to rule them all.
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {' '}
        {/*The buttons like get started etc */}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"></div>
    </>
  );
}
