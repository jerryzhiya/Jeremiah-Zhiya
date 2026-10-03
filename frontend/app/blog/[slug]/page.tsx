import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SocialShare from '@/app/component/socials/page';
import BlogInteractions from '@/app/component/blog/BlogInteraction';
import NextImage from 'next/image';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Define your Next.js Frontend URL (Replace with your actual domain or Vercel URL)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremiah-zhiya.vercel.app';
const API_URL = 'https://jeremiah-zhiya.onrender.com';

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blog/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Jeremiah Zhiya',
    };
  }

  const imageUrl = post.imageUrl
    ? post.imageUrl.startsWith('http')
      ? post.imageUrl
      : `${API_URL}${post.imageUrl}`
    : `${SITE_URL}/default-og-image.jpg`;

  const description = post.summary || post.content?.slice(0, 160) || 'Blog post by Jeremiah Zhiya';
  const fullPostUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | Jeremiah Zhiya`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: fullPostUrl,
      siteName: 'Jeremiah Zhiya Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.createdAt,
      authors: ['Jeremiah Zhiya'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const fullPostUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      {/* Featured Image */}
      {post.imageUrl && (
        <div className="w-full h-80 relative overflow-hidden rounded-2xl mb-8 border border-transparent dark:border-[#2f3e36]">
          <NextImage
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover object-top"
          />
        </div>
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

      {/* Social Sharing Component with Absolute URL */}
      <div className="mb-10">
        <SocialShare title={post.title} url={fullPostUrl} />
      </div>

      {/* Likes and Comments Component */}
      <BlogInteractions slug={post.slug} initialLikes={post.likes || 0} />
    </main>
  );
}