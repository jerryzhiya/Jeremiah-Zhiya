'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft, Edit2, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  readTime: string;
  imageUrl?: string;
  published: boolean;
  createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jeremiah-zhiya.onrender.com/api';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    tags: '',
    readTime: '5 min read',
    imageUrl: '',
    published: true,
  });

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/blog`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditClick = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      tags: post.tags ? post.tags.join(', ') : '',
      readTime: post.readTime || '5 min read',
      imageUrl: post.imageUrl || '',
      published: post.published,
    });
    setFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      summary: '',
      content: '',
      tags: '',
      readTime: '5 min read',
      imageUrl: '',
      published: true,
    });
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('summary', formData.summary);
    data.append('content', formData.content);
    data.append('tags', formData.tags);
    data.append('readTime', formData.readTime);
    data.append('published', String(formData.published));
    if (formData.imageUrl) data.append('imageUrl', formData.imageUrl);
    if (file) data.append('coverImage', file);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/blog/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${API_URL}/blog`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      cancelEdit();
      fetchPosts();
    } catch (err) {
      alert(editingId ? 'Failed to update blog post' : 'Failed to create blog post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-[#1e2723]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] transition">
          <ArrowLeft className="w-5 h-5 text-[#355843]" />
        </Link>
        <h1 className="text-3xl font-serif font-bold">Manage Articles & Notes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-[#e5e9e3] p-6 rounded-2xl border border-[#cbd4c9] space-y-4 md:col-span-1 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5 text-[#355843]" /> : <Plus className="w-5 h-5 text-[#355843]" />}
              {editingId ? 'Edit Article' : 'New Article'}
            </h2>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="p-1 hover:bg-[#cbd4c9] rounded-lg transition">
                <X className="w-5 h-5 text-[#52635a]" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="my-first-article"
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Read Time</label>
            <input
              type="text"
              placeholder="5 min read"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="nextjs, express, architecture"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Summary</label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Content (Markdown/HTML)</label>
            <textarea
              rows={5}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Upload Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-[#52635a] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#355843] file:text-white hover:file:bg-[#284434] transition cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Or Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <button type="submit" className="w-full bg-[#355843] hover:bg-[#284434] text-white py-2.5 rounded-xl font-medium text-sm transition mt-2">
            {editingId ? 'Update Article' : 'Publish Article'}
          </button>
        </form>

        {/* Existing Posts List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-4">Published Articles ({posts.length})</h2>

          {loading ? (
            <p className="text-sm text-[#52635a]">Loading articles...</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-[#52635a]">No articles published yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="p-5 bg-white/60 border border-[#cbd4c9] rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#cbd4c9]" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[#e5e9e3] border border-[#cbd4c9] flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-[#52635a]" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{post.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-[#e5e9e3] px-2 py-0.5 rounded-md text-[#355843] font-semibold">{post.readTime}</span>
                      <span className="text-xs text-[#52635a]">{post.slug}</span>
                    </div>
                    <p className="text-xs text-[#52635a] mt-1 line-clamp-1">{post.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="p-2 text-[#355843] hover:bg-[#e5e9e3] rounded-xl transition"
                    title="Edit Article"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}