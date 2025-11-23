'use client';

import { ThemeChangerButton } from '@/components/theme-changer-button';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/logo';

// import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from '@/components/ui/resizable-navbar';
import { Button } from '@/components/ui/button';
import { Meteors } from '@/components/ui/meteors';
import { Card } from '@/components/ui/card';

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
      {/* navbar */}
      <div data-remove="hide">
        <Meteors number={250} />
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} className="text-md" />
            <div className="absolute top-0 right-0 z-50 flex gap-2 m-2 self-end">
              <a href="/login/index1.html">
                <Button variant="default">Log In/Register → </Button>
              </a>
              <ThemeChangerButton />
            </div>
          </NavBody>
        </Navbar>
      </div>

      <div
        className="grid h-screen place-items-center bg-transparent"
        data-remove="opening-animation">
        <div className="animate-fade-in-out text-6xl text-black dark:text-white w-fit h-fit">
          <motion.div
            animate={{ scale: 50 }}
            transition={{ delay: 3.5, ease: 'easeInOut', duration: 0.5 }}
            className="flex justify-center items-center">
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
          Our EMS is the EMS to rule them all.
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {' '}
        {/*The buttons like get started etc */}
      </div>

      {/* Features Section */}
      <div className="w-full h-fit pb-15 flex justify-center">
        <h1 className="text-4xl font-bold" id="features">
          Features
        </h1>
      </div>

      <div className="h-screen w-full flex flex-1 items-start justify-start px-5">
        <div className="h-screen flex p-2 gap-5">
          <Card
            title="Comprehensive Device-Level Monitoring"
            content="Get precise, real-time data on voltage, current, and power consumption for any connected device to identify wastage and reduce electricity bills."
          />

          <Card
            title="Instant Safety Alerts"
            content="Receive immediate notifications if consumption crosses safe limits or if electrical anomalies are detected to prevent hazards."
          />

          <Card
            title="Smart AI Insights"
            content="Analyzes usage patterns to recommend optimal device operation times and detect abnormal behavior for better energy management."
          />

          <Card
            title="Web & Mobile Remote Control"
            content="Control your device with real-time ON/OFF switching from a responsive dashboard with zero refresh delays."
          />

          <Card
            title="Simple Plug-and-Play Design"
            content="No rewiring needed—compact adapter plugs into any outlet and works instantly in homes or offices."
          />

          <Card
            title="Secure & Private"
            content="Data is transmitted using secure protocols to prevent tampering and protect your personal energy usage information."
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full h-fit pb-15 flex justify-center">
        <h1 className="text-4xl font-bold" id="pricing">
          Pricing
        </h1>
      </div>

      <div className="h-screen w-full flex flex-1 items-start justify-start px-5">
        <div className="h-screen flex p-2 gap-5">
          <Card
            title="Starter Plan"
            content="Includes real-time energy monitoring, alert notifications, and dashboard access for one device, along with daily summary reports."
          />

          <Card
            title="Advanced Plan"
            content="Offers enhanced AI insights, 6-month historical data, customizable reports, priority support, and firmware update access."
          />

          <Card
            title="Enterprise Plan"
            content="Custom solutions for businesses, bulk pricing, account management, and advanced analytics or integrations."
          />

          <Card
            title="Try Before You Buy"
            content="Enjoy a 14-day full-feature free trial with no credit card required."
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full h-fit pb-15 flex justify-center">
        <h1 className="text-4xl font-bold" id="contact">
          Contact
        </h1>
      </div>

      <div className="h-screen w-full flex flex-1 items-start justify-start px-5">
        <div className="h-screen flex p-2 gap-5">
          <Card
            title="Customer Support"
            content="Email: support@yourdomain.com • Phone: +1-234-567-8900 (Mon–Fri, 9AM–6PM) • Live chat available on our website."
          />

          <Card
            title="Sales & Business"
            content="Contact sales@yourdomain.com or call +1-234-567-8911 for business inquiries, partnerships, or bulk orders."
          />

          <Card
            title="Technical Feedback"
            content="We value your input. Send product suggestions or issue reports to feedback@yourdomain.com."
          />

          <Card
            title="Follow Us"
            content="Twitter: @YourCompany • LinkedIn: YourCompany • Facebook: fb.com/YourCompany • Instagram: @YourCompany"
          />
        </div>
      </div>
    </>
  );
}
