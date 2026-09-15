'use client';

import { useState } from 'react';
import { useRouter } from 'next/router'; // or 'next/navigation' in App Router
import { Lock, Mail, Terminal } from 'lucide-react';
import axios from 'axios';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://jeremiah-zhiya.onrender.com/api/auth/login', {
        email,
        password,
      });

      // Save token securely in localStorage
      localStorage.setItem('admin_token', response.data.token);

      // Redirect to admin hub
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#e5e9e3]">
      <div className="max-w-md w-full bg-[#dbe3d8] p-8 rounded-3xl border border-[#cbd4c9] shadow-sm">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Terminal className="w-6 h-6 text-[#355843]" />
          <span className="font-bold text-xl text-[#1e2723]">ADMIN ACCESS</span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-xs text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#52635a] mb-2">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-5 h-5 absolute left-3 text-[#52635a]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#52635a] mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-5 h-5 absolute left-3 text-[#52635a]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd4c9] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#355843]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#355843] hover:bg-[#284434] text-white font-medium py-3 rounded-xl transition text-sm disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </main>
  );
}