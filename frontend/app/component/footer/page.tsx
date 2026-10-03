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
              href="https://github.com/jerryzhiya"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition"
              aria-label="GitHub"
            >
              <FolderGit2 className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jeremiah-zhiya-6862803b0?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/jeremiah_zhiya"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1GmNngGUrU/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/invites/contact/?utm_content=v05z595&stkn=1xg5io1e71e0c"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="mailto:jerryzhiya574@gmail.com"
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
              <Link href="/blog" className="hover:text-[#a3c9b1] dark:hover:text-[#63a375] transition">
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