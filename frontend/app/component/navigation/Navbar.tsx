'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/app/component/theme/ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/component/about' },
    { name: 'Skills', href: '/component/skills' },
    { name: 'Projects', href: '/component/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/component/contact' },
  ];

  return (
    <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
      <nav className="bg-[#e5e9e3]/90 dark:bg-[#1a231e]/90 backdrop-blur-md rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] px-4 sm:px-6 py-4 flex justify-between items-center shadow-xs transition-colors">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-base sm:text-lg pr-4 tracking-wider text-[#1e2723] dark:text-[#e5e9e3]">
            JEREMIAH ZHIYA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-medium text-black dark:text-[#d0dad4]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  isActive
                    ? 'text-[#355843] dark:text-[#63a375] font-semibold'
                    : 'hover:text-[#355843] dark:hover:text-[#63a375]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Work With Me Button */}
          <Link
            href="/component/contact"
            className="hidden sm:inline-flex px-5 py-2 ml-2 text-xs font-medium rounded-full bg-[#355843] text-white hover:bg-[#284434] transition"
          >
            Work With Me
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#2b3531] dark:text-[#e5e9e3] hover:bg-[#d7e0d4] dark:hover:bg-[#28352e] transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#dbe3d8] dark:bg-[#1a231e] rounded-2xl border border-[#c8d4c4] dark:border-[#2f3e36] p-6 mt-2 flex flex-col space-y-4 text-center font-medium shadow-md transition-colors"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#2b3531] dark:text-[#e5e9e3] hover:text-[#355843] dark:hover:text-[#63a375] border-b border-[#cbd4c9]/60 dark:border-[#2f3e36] last:border-none transition"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/component/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-xs font-medium rounded-full bg-[#355843] text-white hover:bg-[#284434] transition text-center"
            >
              Work With Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}