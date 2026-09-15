'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, Heart, MessageSquare } from 'lucide-react';
import { getBlogPosts, BlogPost } from '@/app/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch blog posts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-bold font-serif mb-4 text-[#1c2420] dark:text-[#e5e9e3]">
          Articles & Notes
        </h1>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-base sm:text-lg">
          Thoughts on full-stack architecture, backend engineering, and web development.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-48 rounded-2xl bg-[#dbe3d8] dark:bg-[#1a231e] animate-pulse border border-[#c8d4c4] dark:border-[#2f3e36]"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] transition-colors">
          <BookOpen className="w-10 h-10 text-[#43574b] dark:text-[#63a375] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1c2420] dark:text-[#e5e9e3]">No articles published yet</h3>
          <p className="text-xs text-[#52635a] dark:text-[#a3b3a9] mt-1">
            Check back soon or publish an article from your admin hub.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post, idx) => {
            const commentCount = Array.isArray(post.comments) ? post.comments.length : post.comments || 0;
            const likeCount = post.likes || 0;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-6 sm:p-8 bg-[#dbe3d8] dark:bg-[#1a231e] rounded-3xl border border-[#c8d4c4] dark:border-[#2f3e36] hover:shadow-md transition overflow-hidden"
              >
                {/* Cover Image */}
                {post.imageUrl && (
                  <div className="w-full h-48 sm:h-64 overflow-hidden rounded-2xl mb-6 relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#52635a] dark:text-[#a3b3a9] mb-3">
                  {post.createdAt && (
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#355843] dark:text-[#63a375]" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#355843] dark:text-[#63a375]" />
                      {post.readTime}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    {likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#355843] dark:text-[#63a375]" />
                    {commentCount}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-serif mb-3 text-[#1c2420] dark:text-[#e5e9e3] hover:text-[#355843] dark:hover:text-[#63a375] transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] leading-relaxed mb-6">
                  {post.summary}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#cbd6c8] dark:bg-[#28352e] text-[#284434] dark:text-[#a3c9b1] border border-transparent dark:border-[#2f3e36] px-2.5 py-0.5 rounded-full font-medium transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-xs font-bold text-[#355843] dark:text-[#63a375] uppercase tracking-wider hover:underline"
                >
                  Read Article →
                </Link>
              </motion.article>
            );
          })}
        </div>
      )}
    </main>
  );
}