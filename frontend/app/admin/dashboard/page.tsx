'use client';

import Link from 'next/link';
import { UserCheck, Wrench, ArrowRight, FileText, FolderGit2, MessageSquareQuote } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-[#1e2723] dark:text-[#e5e9e3]">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold mb-2 text-[#1c2420] dark:text-[#e5e9e3]">
          Admin Management Panel
        </h1>
        <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">
          Manage your portfolio content, technical skill sets, dynamic blog, project showcases, and testimonials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. SEPARATE ABOUT CARD */}
        <div className="p-6 bg-[#e5e9e3] dark:bg-[#1a231e] rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-3 text-[#355843] dark:text-[#63a375]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#1c2420] dark:text-[#e5e9e3]">
                About Me Profile
              </h2>
            </div>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] mb-6 leading-relaxed">
              Update your biography, current title, work status, location, and overview paragraphs displayed on the main About page.
            </p>
          </div>
          <Link
            href="/admin/about"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] font-medium text-sm border border-[#cbd4c9] dark:border-[#2f3e36] hover:bg-[#d8e0d5] dark:hover:bg-[#2d3c33] transition"
          >
            <span>Edit Profile Info</span>
            <ArrowRight className="w-4 h-4 text-[#355843] dark:text-[#63a375]" />
          </Link>
        </div>

        {/* 2. SEPARATE SKILLS CARD */}
        <div className="p-6 bg-[#e5e9e3] dark:bg-[#1a231e] rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-3 text-[#355843] dark:text-[#63a375]">
              <Wrench className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#1c2420] dark:text-[#e5e9e3]">
                Core Technical Skills
              </h2>
            </div>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] mb-6 leading-relaxed">
              Add, update, or reorganize frontend frameworks, backend technologies, database ORMs, and developer tooling categories.
            </p>
          </div>
          <Link
            href="/admin/skills"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] font-medium text-sm border border-[#cbd4c9] dark:border-[#2f3e36] hover:bg-[#d8e0d5] dark:hover:bg-[#2d3c33] transition"
          >
            <span>Manage Technical Skills</span>
            <ArrowRight className="w-4 h-4 text-[#355843] dark:text-[#63a375]" />
          </Link>
        </div>

        {/* 3. BLOG POSTS CARD */}
        <div className="p-6 bg-[#e5e9e3] dark:bg-[#1a231e] rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-3 text-[#355843] dark:text-[#63a375]">
              <FileText className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#1c2420] dark:text-[#e5e9e3]">
                Blog Articles
              </h2>
            </div>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] mb-6 leading-relaxed">
              Create, edit, publish, and assign cover images to your technical articles and stories.
            </p>
          </div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] font-medium text-sm border border-[#cbd4c9] dark:border-[#2f3e36] hover:bg-[#d8e0d5] dark:hover:bg-[#2d3c33] transition"
          >
            <span>Manage Blog Posts</span>
            <ArrowRight className="w-4 h-4 text-[#355843] dark:text-[#63a375]" />
          </Link>
        </div>

        {/* 4. PROJECTS CARD */}
        <div className="p-6 bg-[#e5e9e3] dark:bg-[#1a231e] rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-3 text-[#355843] dark:text-[#63a375]">
              <FolderGit2 className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#1c2420] dark:text-[#e5e9e3]">
                Projects Showcase
              </h2>
            </div>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] mb-6 leading-relaxed">
              Add new full-stack project showcases, set repository/live URLs, and feature key builds.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] font-medium text-sm border border-[#cbd4c9] dark:border-[#2f3e36] hover:bg-[#d8e0d5] dark:hover:bg-[#2d3c33] transition"
          >
            <span>Manage Projects</span>
            <ArrowRight className="w-4 h-4 text-[#355843] dark:text-[#63a375]" />
          </Link>
        </div>

        {/* 5. TESTIMONIALS CARD */}
        <div className="p-6 bg-[#e5e9e3] dark:bg-[#1a231e] rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-3 text-[#355843] dark:text-[#63a375]">
              <MessageSquareQuote className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#1c2420] dark:text-[#e5e9e3]">
                Client Testimonials
              </h2>
            </div>
            <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] mb-6 leading-relaxed">
              Add client endorsements, edit ratings and roles, or manage feedback displayed on your site.
            </p>
          </div>
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] font-medium text-sm border border-[#cbd4c9] dark:border-[#2f3e36] hover:bg-[#d8e0d5] dark:hover:bg-[#2d3c33] transition"
          >
            <span>Manage Testimonials</span>
            <ArrowRight className="w-4 h-4 text-[#355843] dark:text-[#63a375]" />
          </Link>
        </div>

      </div>
    </main>
  );
}