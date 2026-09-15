'use client';

import Link from 'next/link';
import { Terminal, Code, Cpu, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif mb-4 text-[#1c2420] dark:text-[#e5e9e3]">
          About Me
        </h1>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-lg">
          Full-Stack Software Engineer building scalable systems and modern web platforms.
        </p>
      </div>

      <div className="space-y-12">
        {/* Bio */}
        <section className="bg-[#e5e9e3] dark:bg-[#1a231e] p-8 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#1c2420] dark:text-[#e5e9e3]">
            <Terminal className="w-6 h-6 text-[#355843] dark:text-[#63a375]" /> Background & Experience
          </h2>
          <p className="leading-relaxed text-[#52635a] dark:text-[#a3b3a9] mb-4">
            I specialize in building full-stack applications using Next.js, Express, TypeScript, and MongoDB/Prisma. My focus is on writing clean, maintainable architecture and engineering seamless end-to-end digital experiences.
          </p>
          <p className="leading-relaxed text-[#52635a] dark:text-[#a3b3a9]">
            Based in Nigeria and working with clients worldwide, I turn complex business requirements into robust digital infrastructure.
          </p>
        </section>

        {/* Core Capabilities */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/50 dark:bg-[#1f2a24] rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
            <Code className="w-8 h-8 text-[#355843] dark:text-[#63a375] mb-3" />
            <h3 className="font-bold text-lg mb-2 text-[#1c2420] dark:text-[#e5e9e3]">Frontend Engineering</h3>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">
              Creating responsive, accessible, and high-performance interfaces with React & Next.js.
            </p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-[#1f2a24] rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
            <Cpu className="w-8 h-8 text-[#355843] dark:text-[#63a375] mb-3" />
            <h3 className="font-bold text-lg mb-2 text-[#1c2420] dark:text-[#e5e9e3]">Backend Architecture</h3>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">
              Designing RESTful APIs, database schemas, and microservices with Express & Prisma.
            </p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-[#1f2a24] rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
            <Globe className="w-8 h-8 text-[#355843] dark:text-[#63a375] mb-3" />
            <h3 className="font-bold text-lg mb-2 text-[#1c2420] dark:text-[#e5e9e3]">Deployment & Cloud</h3>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">
              Deploying scalable applications with automated CI/CD pipelines and cloud hosting.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}