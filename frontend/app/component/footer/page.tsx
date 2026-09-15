import Link from 'next/link';
import { Mail, FolderGit2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#355843] dark:bg-[#121815] border-t border-[#c8d4c4] dark:border-[#2f3e36] mt-28 py-12 text-[#d5e0d9] dark:text-[#a3b3a9] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-bold text-lg text-white dark:text-[#e5e9e3] tracking-wider">
              JEREMIAH ZHIYA
            </span>
          </div>
          <p className="text-sm text-[#e5e9e3] dark:text-[#a3b3a9] max-w-sm leading-relaxed mb-6">
            Building reliable full-stack web applications, scalable backend systems, and modern digital platforms.
          </p>
          <div className="flex space-x-4 text-white dark:text-[#e5e9e3]">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition" 
              aria-label="GitHub"
            >
              <FolderGit2 className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition" 
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition" 
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a 
              href="mailto:contact@example.com" 
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition" 
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-white dark:text-[#e5e9e3] mb-4 text-sm uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-[#e5e9e3] dark:text-[#a3b3a9]">
            <li>
              <Link href="/component/about" className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/component/skills" className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition">
                Technical Skills
              </Link>
            </li>
            <li>
              <Link href="/component/projects" className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition">
                Featured Work
              </Link>
            </li>
            <li>
              <Link href="/component/blog" className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition">
                Articles & Notes
              </Link>
            </li>
          </ul>
        </div>

        {/* Status */}
        <div>
          <h4 className="font-serif font-bold text-white dark:text-[#e5e9e3] mb-4 text-sm uppercase tracking-wider">
            Status
          </h4>
          <div className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-[#1f2a24] text-[#355843] dark:text-[#a3c9b1] border border-transparent dark:border-[#2f3e36] px-3 py-1.5 rounded-full w-fit mb-3 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for New Projects
          </div>
          <p className="text-xs text-[#e5e9e3] dark:text-[#a3b3a9]">Based in Nigeria • Remote Worldwide</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-[#466d56] dark:border-[#2f3e36] flex flex-col sm:flex-row justify-between text-xs text-[#d5e0d9] dark:text-[#88988e] transition-colors">
        <p>© {new Date().getFullYear()} Jeremiah Zhiya. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Built with Next.js, Tailwind CSS, & Express</p>
      </div>
    </footer>
  );
}