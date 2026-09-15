'use client';

import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminSkillsAboutPage() {
  const [bio, setBio] = useState(
    'Full-Stack Software Engineer building scalable systems and modern web platforms. Based in Nigeria and working with clients worldwide.'
  );
  const [skills, setSkills] = useState({
    frontend: 'React, Next.js, TypeScript, Tailwind CSS, Redux',
    backend: 'Node.js, Express.js, Prisma ORM, REST APIs, JWT',
    database: 'MongoDB, PostgreSQL, Redis, Docker, Git',
  });
  const [status, setStatus] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to your backend route/config storage
    setStatus('Saved successfully!');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-[#1e2723]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] transition">
          <ArrowLeft className="w-5 h-5 text-[#355843]" />
        </Link>
        <h1 className="text-3xl font-serif font-bold">Skills & Bio Settings</h1>
      </div>

      {status && (
        <div className="mb-6 p-3 rounded-xl bg-green-100 text-green-700 text-xs font-bold text-center border border-green-200">
          {status}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#e5e9e3] p-8 rounded-2xl border border-[#cbd4c9] space-y-6">
        <div>
          <h2 className="text-lg font-bold mb-2">About Bio</h2>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
          />
        </div>

        <hr className="border-[#cbd4c9]" />

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Technical Skills List</h2>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Frontend Stack</label>
            <input
              type="text"
              value={skills.frontend}
              onChange={(e) => setSkills({ ...skills, frontend: e.target.value })}
              className="w-full p-3 rounded-xl border border-[#cbd4c9] bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Backend Stack</label>
            <input
              type="text"
              value={skills.backend}
              onChange={(e) => setSkills({ ...skills, backend: e.target.value })}
              className="w-full p-3 rounded-xl border border-[#cbd4c9] bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Database & DevOps</label>
            <input
              type="text"
              value={skills.database}
              onChange={(e) => setSkills({ ...skills, database: e.target.value })}
              className="w-full p-3 rounded-xl border border-[#cbd4c9] bg-white text-sm"
            />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 bg-[#355843] text-white px-6 py-3 rounded-xl font-medium text-sm">
          <Save className="w-4 h-4" /> Save Content Changes
        </button>
      </form>
    </main>
  );
}