'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, ArrowLeft, Edit2, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'SCHOOL_SYSTEM' | 'CLIENT_WORK' | 'ORGANIZATION' | 'PERSONAL_WORK';
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'CLIENT_WORK',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      category: project.category,
      techStack: project.techStack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured,
    });
    setFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: 'CLIENT_WORK',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      featured: false,
    });
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('techStack', formData.techStack);
    if (formData.liveUrl) data.append('liveUrl', formData.liveUrl);
    if (formData.githubUrl) data.append('githubUrl', formData.githubUrl);
    if (formData.imageUrl) data.append('imageUrl', formData.imageUrl);
    if (file) data.append('image', file);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/projects/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${API_URL}/projects`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      cancelEdit();
      fetchProjects();
    } catch (err) {
      alert(editingId ? 'Failed to update project' : 'Failed to create project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-[#1e2723]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] transition">
          <ArrowLeft className="w-5 h-5 text-[#355843]" />
        </Link>
        <h1 className="text-3xl font-serif font-bold">Manage Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-[#e5e9e3] p-6 rounded-2xl border border-[#cbd4c9] space-y-4 md:col-span-1 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5 text-[#355843]" /> : <Plus className="w-5 h-5 text-[#355843]" />}
              {editingId ? 'Edit Project' : 'Add Project'}
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
              onChange={(e) => {
                const title = e.target.value;
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                setFormData({ ...formData, title, slug: editingId ? formData.slug : slug });
              }}
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
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            >
              <option value="CLIENT_WORK">Client Work</option>
              <option value="SCHOOL_SYSTEM">School System</option>
              <option value="ORGANIZATION">Organization</option>
              <option value="PERSONAL_WORK">Personal Work</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Upload New Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-[#52635a] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#355843] file:text-white hover:file:bg-[#284434] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Or Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Live Demo URL</label>
            <input
              type="url"
              placeholder="https://your-demo-app.com"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">GitHub Repository URL</label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-[#cbd4c9] bg-white"
            />
          </div>

          <button type="submit" className="w-full bg-[#355843] hover:bg-[#284434] text-white py-2.5 rounded-xl font-medium text-sm transition mt-2">
            {editingId ? 'Update Project' : 'Publish Project'}
          </button>
        </form>

        {/* Existing Projects List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-4">Existing Projects ({projects.length})</h2>

          {loading ? (
            <p className="text-sm text-[#52635a]">Loading projects...</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="p-5 bg-white/60 border border-[#cbd4c9] rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#cbd4c9]" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[#e5e9e3] border border-[#cbd4c9] flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-[#52635a]" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{project.title}</h3>
                    <span className="text-xs bg-[#e5e9e3] px-2 py-0.5 rounded-md text-[#355843] font-semibold">{project.category}</span>
                    <p className="text-xs text-[#52635a] mt-1 line-clamp-1">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="p-2 text-[#355843] hover:bg-[#e5e9e3] rounded-xl transition"
                    title="Edit Project"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Delete Project"
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