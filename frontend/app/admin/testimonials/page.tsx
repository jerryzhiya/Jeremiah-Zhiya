'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    avatarUrl: '',
    rating: 5,
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 1. Fetch all testimonials on mount
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://jeremiah-zhiya.onrender.com/api'}/testimonials`);
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // 2. Handle image upload to Cloudinary via backend
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

  // 3. Handle Create or Update submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('admin_token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://jeremiah-zhiya.onrender.com/api';
    const isEditing = Boolean(editingId);

    const endpoint = isEditing ? `${baseUrl}/testimonials/${editingId}` : `${baseUrl}/testimonials`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isEditing ? 'Testimonial updated!' : 'Testimonial created!');
        resetForm();
        fetchTestimonials();
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

  // 4. Start editing a testimonial
  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      avatarUrl: item.avatarUrl || '',
      rating: item.rating || 5,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Delete a testimonial
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://jeremiah-zhiya.onrender.com/api';

      const res = await fetch(`${baseUrl}/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
        if (editingId === id) resetForm();
      } else {
        alert('Failed to delete testimonial');
      }
    } catch (err) {
      console.error('Failed to delete testimonial', err);
      alert('Error deleting testimonial');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', role: '', content: '', avatarUrl: '', rating: 5 });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-[#1e2723] dark:text-[#e5e9e3]">
      <h1 className="text-3xl font-bold mb-6">
        {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
      </h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 py-3 bg-[#355843] hover:bg-[#2a4735] text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Testimonials List Section */}
      <h2 className="text-2xl font-bold mb-4">Existing Testimonials</h2>
      {fetching ? (
        <p className="text-sm opacity-70">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-sm opacity-70">No testimonials found.</p>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#e5e9e3] dark:bg-[#1a231e] border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {item.avatarUrl && (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#cbd4c9] dark:border-[#2f3e36]"
                  />
                )}
                <div>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <p className="text-xs text-[#52635a] dark:text-[#a3b3a9]">{item.role}</p>
                  <p className="text-xs mt-1 line-clamp-2 text-[#2f3e36] dark:text-[#d0dad4]">
                    &quot;{item.content}&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1.5 bg-[#355843] text-white text-xs font-semibold rounded-lg hover:bg-[#2a4735] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}