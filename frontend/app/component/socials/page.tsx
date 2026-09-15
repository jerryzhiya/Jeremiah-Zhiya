'use client';

import { useState, useEffect } from 'react';

interface SocialShareProps {
  title: string;
  slug: string;
}

export default function SocialShare({ title, slug }: SocialShareProps) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Construct full URL only after client mounts
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  // Don't construct full window URLs until mounted
  const encodedUrl = encodeURIComponent(shareUrl || `/blog/${slug}`);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-[#52635a] dark:text-[#a3b3a9]">
        Share Article:
      </span>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-medium hover:opacity-90 transition"
        title="Share on WhatsApp"
      >
        WhatsApp
      </a>

      {/* Twitter / X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] dark:bg-[#1a231e] dark:hover:bg-[#28352e] text-xs transition"
        title="Share on X"
      >
        X
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] dark:bg-[#1a231e] dark:hover:bg-[#28352e] text-xs transition"
        title="Share on LinkedIn"
      >
        LinkedIn
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] dark:bg-[#1a231e] dark:hover:bg-[#28352e] text-xs transition"
        title="Share on Facebook"
      >
        Facebook
      </a>
    </div>
  );
}