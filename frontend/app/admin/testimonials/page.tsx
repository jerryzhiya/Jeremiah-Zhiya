'use client';

import { useState } from 'react';

export default function AdminTestimonialsPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    avatarUrl: '',
    rating: 5,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle direct image file upload from phone or laptop
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const token = localStorage.getItem('admin_token');
      const res = await fetch('https://jeremiah-zhiya.onrender.com/api/testimonials/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, avatarUrl: data.url }));
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      console.error('Failed to upload image', err);
      alert('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Testimonial created successfully!');
        setFormData({ name: '', role: '', content: '', avatarUrl: '', rating: 5 });
      } else {
        alert('Failed to save testimonial');
      }
    } catch (err) {
      console.error('Failed to save testimonial', err);
      alert('Error saving testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 pt-28 pb-16 text-[#1e2723] dark:text-[#e5e9e3]">
      <h1 className="text-3xl font-bold mb-6">Add New Testimonial</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36]">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role / Company</label>
          <input
            type="text"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-3 rounded-lg border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Client Avatar Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 rounded-lg border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#355843] file:text-white hover:file:bg-[#2a4735]"
          />
          {uploading && <p className="text-xs text-[#355843] dark:text-[#63a375] mt-1">Uploading image...</p>}
          {formData.avatarUrl && (
            <p className="text-xs text-emerald-600 mt-1 truncate">
              Uploaded: {formData.avatarUrl}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Testimonial Content</label>
          <textarea
            rows={4}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 rounded-lg border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029]"
          />
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-3 bg-[#355843] hover:bg-[#2a4735] text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Testimonial'}
        </button>
      </form>
    </main>
  );
}