'use client';

// import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import Image from 'next/image';
// import { motion } from 'motion/react';
// import {Button} from '@/components/ui/button';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  //   NavbarButton,
} from '@/components/ui/resizable-navbar';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

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
        {/* NAVBAR */}
        <Navbar className="h-full mt-2">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} className='text-md' />
          </NavBody>
        </Navbar>
      </header>

      <div className="flex items-center justify-center flex-col min-h-screen w-screen bg-green-500">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Whatever thingy the name is
        </h1>
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
