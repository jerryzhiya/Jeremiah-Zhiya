'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, UserCheck } from 'lucide-react';
import Link from 'next/link';

interface AboutFormData {
  name: string;
  title: string;
  location: string;
  bio: string;
  secondaryBio: string;
}

export default function AdminAboutPage() {
  const [formData, setFormData] = useState<AboutFormData>({
    name: 'Jeremiah Zhiya',
    title: 'Full-Stack Software Engineer building scalable systems and modern web platforms.',
    location: 'Based in Nigeria • Remote Worldwide',
    bio: 'I specialize in building full-stack applications using Next.js, Express, TypeScript, and MongoDB/Prisma. My focus is on writing clean, maintainable architecture and engineering seamless end-to-end digital experiences.',
    secondaryBio: 'Based in Nigeria and working with clients worldwide, I turn complex business requirements into robust digital infrastructure.',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch current About profile data on load
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch('https://jeremiah-zhiya.onrender.com/api/about', {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData({
              name: data.name || '',
              title: data.title || '',
              location: data.location || '',
              bio: data.bio || '',
              secondaryBio: data.secondaryBio || '',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load About data:', err);
      }
    };

    fetchAboutData();
  }, []);

  // Send updated data to backend on submit
  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('https://jeremiah-zhiya.onrender.com/api/about', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Parse the error message sent from your Express controller
      const errorData = await res.json().catch(() => ({}));
      console.error('Backend error response:', res.status, errorData);
      throw new Error(errorData.message || `Server error: ${res.status}`);
    }

    setStatus('About section updated successfully!');
    setTimeout(() => setStatus(''), 3000);
  } catch (err: any) {
    console.error(err);
    alert(`Failed to update About section: ${err.message}`);
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/dashboard"
          className="p-2 rounded-xl bg-[#e5e9e3] dark:bg-[#28352e] hover:bg-[#cbd4c9] dark:hover:bg-[#35483f] transition"
        >
          <ArrowLeft className="w-5 h-5 text-[#355843] dark:text-[#a3c9b1]" />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3]">
          Manage About Me
        </h1>
      </div>

      {status && (
        <div className="mb-6 p-3 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold text-center border border-green-200 dark:border-green-800">
          {status}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-[#e5e9e3] dark:bg-[#1a231e] p-8 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] space-y-6 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2 font-bold text-lg text-[#355843] dark:text-[#63a375]">
          <UserCheck className="w-5 h-5" /> Bio & Personal Info
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#52635a] dark:text-[#a3b3a9]">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-[#e5e9e3] focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#52635a] dark:text-[#a3b3a9]">
              Professional Title / Subtitle
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-[#e5e9e3] focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a] dark:text-[#a3b3a9]">
            Location / Status
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-[#e5e9e3] focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a] dark:text-[#a3b3a9]">
            Primary Summary
          </label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-4 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-[#e5e9e3] focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1 text-[#52635a] dark:text-[#a3b3a9]">
            Secondary Paragraph
          </label>
          <textarea
            rows={3}
            value={formData.secondaryBio}
            onChange={(e) => setFormData({ ...formData, secondaryBio: e.target.value })}
            className="w-full p-4 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-[#e5e9e3] focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#355843] hover:bg-[#284434] dark:bg-[#436e54] dark:hover:bg-[#355843] text-white px-6 py-3 rounded-xl font-medium text-sm transition"
        >
          <Save className="w-4 h-4" /> {loading ? 'Saving Changes...' : 'Save About Profile'}
        </button>
      </form>
    </main>
  );
}