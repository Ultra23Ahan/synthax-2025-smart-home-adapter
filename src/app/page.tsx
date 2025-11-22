'use client';

import { ThemeChangerButton } from '@/components/theme-changer-button';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/logo';

// import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  //   NavbarButton,
} from '@/components/ui/resizable-navbar';

export default function Page() {
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
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
    loadStartingAnimation();
  }, []);

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
      <header className="absolute w-full">
        {/* navbar */}
        <div data-remove="hide">
          <Navbar className="h-full mt-2">
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} className="text-md" />
            </NavBody>
          </Navbar>
        </div>
      </header>
      {/* The dark mode light mode button */}
      <div className="fixed top-1 right-1 z-50">
        <ThemeChangerButton />
      </div>
      <div
        className="grid h-screen place-items-center bg-transparent"
        data-remove="opening-animation">
        <h1 className="animate-fade-in-out z-40 text-6xl text-black dark:text-white">
          <Logo width={14} height={14} />
        </h1>
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
