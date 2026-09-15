'use client';

import { useState } from 'react';
import { ArrowLeft, Save, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    name: 'Jeremiah Zhiya',
    title: 'Full-Stack Software Engineer',
    location: 'Based in Nigeria • Remote Worldwide',
    bio: 'I specialize in building full-stack applications using Next.js, Express, TypeScript, and MongoDB/Prisma. My focus is on writing clean, maintainable architecture and engineering seamless end-to-end digital experiences.',
    secondaryBio: 'Based in Nigeria and working with clients worldwide, I turn complex business requirements into robust digital infrastructure.',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Connect to your backend config/about route or save to database
      setStatus('About section updated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      alert('Failed to update About section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-[#1e2723]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] transition">
          <ArrowLeft className="w-5 h-5 text-[#355843]" />
        </Link>
        <h1 className="text-3xl font-serif font-bold">Manage About Me</h1>
      </div>

      {status && (
        <div className="mb-6 p-3 rounded-xl bg-green-100 text-green-700 text-xs font-bold text-center border border-green-200">
          {status}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#e5e9e3] p-8 rounded-2xl border border-[#cbd4c9] space-y-6">
        <div className="flex items-center gap-2 mb-2 font-bold text-lg text-[#355843]">
          <UserCheck className="w-5 h-5" /> Bio & Personal Info
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#52635a]">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#52635a]">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a]">Location / Status</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a]">Primary Summary</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-4 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a]">Secondary Paragraph</label>
          <textarea
            rows={3}
            value={formData.secondaryBio}
            onChange={(e) => setFormData({ ...formData, secondaryBio: e.target.value })}
            className="w-full p-4 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#355843] hover:bg-[#284434] text-white px-6 py-3 rounded-xl font-medium text-sm transition"
        >
          <Save className="w-4 h-4" /> {loading ? 'Saving Changes...' : 'Save About Profile'}
        </button>
      </form>
    </main>
  );
}