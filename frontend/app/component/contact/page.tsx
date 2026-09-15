'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif mb-4 text-[#1c2420] dark:text-[#e5e9e3]">
          Get In Touch
        </h1>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-lg">
          Have a project in mind or looking for a full-stack engineer? Let's talk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
            <h2 className="text-xl font-bold mb-4 text-[#1c2420] dark:text-[#e5e9e3]">
              Contact Information
            </h2>
            <div className="space-y-4 text-sm text-[#52635a] dark:text-[#a3b3a9]">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#355843] dark:text-[#63a375]" />
                <a 
                  href="mailto:jerryzhiya574@gmail.com" 
                  className="hover:text-[#355843] dark:hover:text-[#63a375] transition"
                >
                  jerryzhiya574@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#355843] dark:text-[#63a375]" />
                <span>Based in Nigeria • Remote Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] space-y-4 transition-colors"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#52635a] dark:text-[#a3b3a9]">
              Name
            </label>
            <input 
              type="text" 
              required
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#1f2a24] text-[#1c2420] dark:text-[#e5e9e3] placeholder-[#88988e] dark:placeholder-[#64756b] text-sm focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375] transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#52635a] dark:text-[#a3b3a9]">
              Email
            </label>
            <input 
              type="email" 
              required
              placeholder="you@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#1f2a24] text-[#1c2420] dark:text-[#e5e9e3] placeholder-[#88988e] dark:placeholder-[#64756b] text-sm focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375] transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#52635a] dark:text-[#a3b3a9]">
              Message
            </label>
            <textarea 
              rows={4} 
              required
              placeholder="Tell me about your project..." 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#1f2a24] text-[#1c2420] dark:text-[#e5e9e3] placeholder-[#88988e] dark:placeholder-[#64756b] text-sm focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375] transition-colors" 
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center">
              Message sent successfully! I'll get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium text-center">
              Failed to send message. Please try again or email directly.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}