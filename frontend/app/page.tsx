'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      {/* Hero Section */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 sm:mb-28">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium text-[#2d4b39] dark:text-[#a3c9b1] bg-[#d3dcd0] dark:bg-[#28352e] mb-6 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Full-Stack Software Engineer
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1c2420] dark:text-[#e5e9e3] tracking-tight leading-tight mb-6 transition-colors">
            Building your digital legacy is my priority.
          </h1>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-base sm:text-lg leading-relaxed mb-8 transition-colors">
            Specialized in designing and engineering high-impact web applications, robust APIs, and scalable cloud systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link 
              href="/component/contact" 
              className="px-6 py-3.5 rounded-full bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white font-medium transition flex items-center justify-center gap-2 text-sm"
            >
              Schedule Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/component/projects" 
              className="px-6 py-3.5 rounded-full bg-[#d7e0d4] dark:bg-[#1f2a24] hover:bg-[#cbd6c8] dark:hover:bg-[#2a3830] text-[#2b3531] dark:text-[#e5e9e3] border border-transparent dark:border-[#2f3e36] font-medium transition text-sm text-center"
            >
              Explore Projects
            </Link>
          </div>
        </motion.div>

        {/* Hero Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 bg-[#dbe3d8] dark:bg-[#1a231e] rounded-3xl p-6 shadow-sm border border-[#c8d4c4] dark:border-[#2f3e36] transition-colors"
        >
          <div className="w-full h-64 sm:h-80 rounded-2xl mb-6 overflow-hidden relative shadow-inner">
            <Image
              src="/preview.jpeg" 
              alt="Jeremiah Zhiya"
              fill
              priority
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] transition-colors">Jeremiah Zhiya</h3>
          <p className="text-[#355843] dark:text-[#63a375] text-sm font-medium mb-2 transition-colors">Lead Full-Stack Developer</p>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-xs leading-relaxed transition-colors">
            Crafting reliable digital solutions using Next.js, Express, TypeScript, and MongoDB.
          </p>
        </motion.div>
      </header>

      {/* Call To Action Banner */}
      <section className="rounded-3xl bg-[#355843] dark:bg-[#1e2d24] text-white p-8 sm:p-12 text-center shadow-lg border border-transparent dark:border-[#2f3e36] transition-colors">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4">You don't have to build it alone.</h2>
        <p className="text-[#d5e0d9] dark:text-[#b4c7bb] max-w-xl mx-auto mb-8 text-sm md:text-base">
          Let's discuss your project goals, technical requirements, and backend architecture.
        </p>
        <Link 
          href="/component/contact" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-[#e5e9e3] text-[#284434] font-bold hover:bg-[#eaf0eb] dark:hover:bg-white transition w-full sm:w-auto"
        >
          Get In Touch <Send className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}