import { notFound } from 'next/navigation';
import SocialShare from '@/app/component/socials/page';
import BlogInteractions from '@/app/component/blog/BlogInteraction';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/blog/${slug}`, {
      cache: 'no-store', // Ensures fresh data on request
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      {/* Featured Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover rounded-2xl mb-8 border border-transparent dark:border-[#2f3e36]"
        />
      )}

      {/* Header Info */}
      <h1 className="text-4xl font-bold font-serif text-[#1c2420] dark:text-[#e5e9e3] mb-4 transition-colors">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-xs text-[#52635a] dark:text-[#a3b3a9] mb-6 transition-colors">
        <span>{post.readTime || '5 min read'}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#e5e9e3] dark:bg-[#28352e] text-[#355843] dark:text-[#a3c9b1] text-xs font-semibold rounded-full border border-transparent dark:border-[#2f3e36] transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Main Article Content */}
      <div className="prose dark:prose-invert max-w-none text-[#2f3e36] dark:text-[#d0dad4] leading-relaxed mb-10 transition-colors whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Social Sharing Component */}
      <div className="mb-10">
        <SocialShare title={post.title} slug={post.slug} />
      </div>

      {/* Likes and Comments Component */}
      <BlogInteractions slug={post.slug} initialLikes={post.likes || 0} />
    </main>
  );
}