'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-[#e2e8f0]">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#f1f5f9]">
          Admin Management Hub
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin_token');
            router.push('/admin/login');
          }}
          className="text-xs font-bold text-red-400 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 bg-[#18221c] border border-[#2d3e33] rounded-2xl hover:border-[#4ade80]/50 hover:bg-[#1f2d25] transition group"
        >
          <h2 className="text-xl font-bold mb-2 text-[#f1f5f9] group-hover:text-[#4ade80] transition-colors">
            Projects
          </h2>
          <p className="text-sm text-[#94a3b8]">
            Add, edit, or remove portfolio projects.
          </p>
        </Link>

        <Link
          href="/admin/blog"
          className="p-6 bg-[#18221c] border border-[#2d3e33] rounded-2xl hover:border-[#4ade80]/50 hover:bg-[#1f2d25] transition group"
        >
          <h2 className="text-xl font-bold mb-2 text-[#f1f5f9] group-hover:text-[#4ade80] transition-colors">
            Blog Posts
          </h2>
          <p className="text-sm text-[#94a3b8]">
            Write and publish new technical articles.
          </p>
        </Link>

        <Link
          href="/admin/skills"
          className="p-6 bg-[#18221c] border border-[#2d3e33] rounded-2xl hover:border-[#4ade80]/50 hover:bg-[#1f2d25] transition group"
        >
          <h2 className="text-xl font-bold mb-2 text-[#f1f5f9] group-hover:text-[#4ade80] transition-colors">
            Skills & About
          </h2>
          <p className="text-sm text-[#94a3b8]">
            Update technical stack categories and bio.
          </p>
        </Link>
      </div>
    </main>
  );
}