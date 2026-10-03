'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Send, 
  Hammer, 
  Code2, 
  FileText, 
  Download, 
  CheckCircle2 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      {/* Hero Section */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium text-[#2d4b39] dark:text-[#a3c9b1] bg-[#d3dcd0] dark:bg-[#28352e] mb-6 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Shoemaker Turned Software Engineer
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1c2420] dark:text-[#e5e9e3] tracking-tight leading-tight mb-6 transition-colors">
            Handcrafting robust code with obsessive precision.
          </h1>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-base sm:text-lg leading-relaxed mb-8 transition-colors">
            I traded physical leather for clean architecture. Bringing the meticulous art of custom finishing from the workshop to full-stack web engineering.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/component/contact"
              className="px-6 py-3.5 rounded-full bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white font-medium transition flex items-center justify-center gap-2 text-sm shadow-md"
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
          className="lg:col-span-5 bg-[#dbe3d8] dark:bg-[#1a231e] rounded-3xl p-6 shadow-sm border border-[#c8d4c4] dark:border-[#2f3e36] transition-colors relative overflow-hidden"
        >
          <div className="w-full h-64 sm:h-80 rounded-2xl mb-6 overflow-hidden relative shadow-inner">
            <Image
              src="/preview.jpeg"
              alt="Jeremiah Zhiya"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] transition-colors">Jeremiah Zhiya</h3>
            <div className="flex gap-1.5 text-[#355843] dark:text-[#63a375]">
              <span title="Craftsman">
                <Hammer className="w-4 h-4" />
              </span>
              <span title="Developer">
                <Code2 className="w-4 h-4" />
              </span>
            </div>
          </div>
          
          <p className="text-[#355843] dark:text-[#63a375] text-sm font-medium mb-2 transition-colors">Full-Stack MERN Developer & Craftsman</p>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-xs leading-relaxed transition-colors">
            Building reliable full-stack applications with Node.js, React, Prisma, and robust backend logic out of Abuja, Nigeria.
          </p>
        </motion.div>
      </header>

      {/* Craftsman's Approach Snapshot */}
      <section className="mb-16 sm:mb-20 bg-[#dbe3d8]/40 dark:bg-[#1a231e]/40 rounded-3xl p-8 sm:p-12 border border-[#c8d4c4] dark:border-[#2f3e36] text-center max-w-4xl mx-auto transition-colors">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-4">
          Why &quot;Craftsmanship&quot; Matters in Code
        </h2>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
          Transitioning from a professional physical workshop to building digital systems taught me one non-negotiable truth: 
          <strong className="text-[#1c2420] dark:text-[#e5e9e3] font-medium"> the finishing defines the product.</strong> I don&apos;t just write code that works; I engineer scalable architectures built with structural integrity.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#355843] dark:text-[#63a375] uppercase tracking-wider">
          <span>✓ Zero Shortcuts</span>
          <span>✓ Clean Architecture</span>
          <span>✓ Real-World Problem Solving</span>
        </div>
      </section>

      {/* Quick-Look Gateway Grid */}
      <section className="mb-16 sm:mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skills Teaser */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div>
            <span className="text-xs font-semibold text-[#355843] dark:text-[#63a375] uppercase tracking-wider block mb-2">
              Expertise
            </span>
            <h3 className="text-lg font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-2">
              My Tech Arsenal
            </h3>
            <p className="text-[#52635a] dark:text-[#a3b3a9] text-xs sm:text-sm mb-6">
              Explore the languages, frameworks, and architectural tools I use to build robust full-stack apps.
            </p>
          </div>
          <Link
            href="/component/skills" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#355843] dark:text-[#63a375] hover:underline"
          >
            View skills <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Teaser */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div>
            <span className="text-xs font-semibold text-[#355843] dark:text-[#63a375] uppercase tracking-wider block mb-2">
              Execution
            </span>
            <h3 className="text-lg font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-2">
              Featured Projects
            </h3>
            <p className="text-[#52635a] dark:text-[#a3b3a9] text-xs sm:text-sm mb-6">
              Check out complete system builds, including backend architectures and management platforms.
            </p>
          </div>
          <Link
            href="/component/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#355843] dark:text-[#63a375] hover:underline"
          >
            Explore projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Teaser */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div>
            <span className="text-xs font-semibold text-[#355843] dark:text-[#63a375] uppercase tracking-wider block mb-2">
              Insights
            </span>
            <h3 className="text-lg font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-2">
              Read My Blog
            </h3>
            <p className="text-[#52635a] dark:text-[#a3b3a9] text-xs sm:text-sm mb-6">
              Read thoughts on code architecture, web development lessons, and the craft of building from scratch.
            </p>
          </div>
          <Link
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#355843] dark:text-[#63a375] hover:underline"
          >
            Read articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Resume / CV Download Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20 sm:mb-28 bg-[#dbe3d8] dark:bg-[#1a231e] rounded-3xl p-6 sm:p-8 border border-[#c8d4c4] dark:border-[#2f3e36] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-[#355843]/10 dark:bg-[#436e54]/20 text-[#355843] dark:text-[#63a375] shrink-0">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-1">
              Curriculum Vitae
            </h2>
            <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#a3b3a9] mb-3">
              Explore my technical stack, commercial experience, and engineering background.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[#355843] dark:text-[#63a375] font-medium">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Node.js & React
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Express & Prisma
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Full-Stack Architecture
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/resume"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white font-medium text-sm transition shadow-md shrink-0"
        >
          <Download className="w-4 h-4" /> View Resume
        </Link>
      </motion.section>

      {/* Call To Action Banner */}
      <section className="rounded-3xl bg-[#355843] dark:bg-[#1e2d24] text-white p-8 sm:p-12 text-center shadow-lg border border-transparent dark:border-[#2f3e36] transition-colors relative overflow-hidden">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold mb-4">Let&apos;s build something that stands the test of time.</h2>
        <p className="text-[#d5e0d9] dark:text-[#b4c7bb] max-w-xl mx-auto mb-8 text-sm md:text-base">
          Whether you need a custom web app, a scalable backend, or a reliable technical partner—let&apos;s talk.
        </p>
        <Link
          href="/component/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-[#e5e9e3] text-[#284434] font-bold hover:bg-[#eaf0eb] dark:hover:bg-white transition w-full sm:w-auto shadow-md"
        >
          Get In Touch <Send className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}