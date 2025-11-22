'use client';

import { ThemeChangerButton } from '@/components/theme-changer-button';

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
        <Navbar className="h-full mt-2">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} className="text-md" />
          </NavBody>
        </Navbar>
      </header>
      {/* The dark mode light mode button */}
      <div className="fixed top-1 right-1 z-50">
        <ThemeChangerButton />
      </div>

      <div className="flex items-center justify-center flex-col min-h-screen w-screen ">
        <motion.h1 className="text-5xl font-semibold tracking-tight text-balance text-black dark:text-white md:text-6xl" animate={}>
          Smart Energy Adapter
        </motion.h1>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Our HEMS is the HEMS to rule them all.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {' '}
          {/*The buttons like get started etc */}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"></div>
      </div>
    </>
  );
}
