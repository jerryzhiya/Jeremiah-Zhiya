'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface BlogInteractionsProps {
  slug: string;
  initialLikes?: number;
}

export default function BlogInteractions({ slug, initialLikes = 0 }: BlogInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments on load
  useEffect(() => {
    fetch(`https://jeremiah-zhiya.onrender.com/api/blog/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        }
      })
      .catch((err) => console.error('Failed to load comments:', err));
  }, [slug]);

  // Handle Like Button
  const handleLike = async () => {
    if (hasLiked) return;
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    try {
      await fetch(`https://jeremiah-zhiya.onrender.com/api/blog/${slug}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  // Handle Comment Form Submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch(`https://jeremiah-zhiya.onrender.com/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setAuthor('');
        setContent('');
      }
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-[#cbd4c9] dark:border-[#2f3e36] transition-colors duration-300">
      {/* Like Button */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition ${
            hasLiked
              ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
              : 'bg-[#e5e9e3] dark:bg-[#1a231e] text-[#1c2420] dark:text-[#e5e9e3] hover:bg-[#cbd4c9] dark:hover:bg-[#28352e] border border-transparent dark:border-[#2f3e36]'
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : 'text-[#355843] dark:text-[#63a375]'}`} />
          <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </button>
      </div>

      {/* Comments Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-[#355843] dark:text-[#63a375]" />
        <h3 className="text-xl font-bold font-serif text-[#1c2420] dark:text-[#e5e9e3]">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] mb-8 space-y-4 transition-colors">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#52635a] dark:text-[#a3b3a9]">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#1f2a24] text-[#1c2420] dark:text-[#e5e9e3] placeholder-[#88988e] dark:placeholder-[#64756b] text-sm focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#52635a] dark:text-[#a3b3a9]">
            Comment
          </label>
          <textarea
            rows={3}
            required
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#1f2a24] text-[#1c2420] dark:text-[#e5e9e3] placeholder-[#88988e] dark:placeholder-[#64756b] text-sm focus:outline-none focus:ring-2 focus:ring-[#355843] dark:focus:ring-[#63a375] transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white font-medium px-6 py-2.5 rounded-xl transition flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <Send className="w-4 h-4" /> {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-[#52635a] dark:text-[#a3b3a9] italic">Be the first to leave a comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 rounded-xl bg-white/50 dark:bg-[#1f2a24] border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-[#1c2420] dark:text-[#e5e9e3]">{comment.author}</span>
                <span className="text-xs text-[#52635a] dark:text-[#a3b3a9]">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}