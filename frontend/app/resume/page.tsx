'use client';

import { Download, ExternalLink, FileText } from 'lucide-react';

export default function ResumePage() {
  const resumeUrl = '/Jeremiah_Zhiya_Fullstack_Developer_Resume.pdf';

  return (
    <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-[#1e2723] dark:text-[#e5e9e3]">
      {/* Header & Download Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3]">
            Curriculum Vitae
          </h1>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-sm mt-1">
            Jeremiah Zhiya — Full-Stack MERN Developer & Craftsman
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Direct Download Button */}
          <a
            href={resumeUrl}
            download="Jeremiah_Zhiya_Resume.pdf"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#355843] dark:bg-[#436e54] hover:bg-[#284434] dark:hover:bg-[#355843] text-white text-sm font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>

          {/* Open in New Tab Button */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#e5e9e3] hover:bg-[#cbd4c9] dark:bg-[#1a231e] dark:hover:bg-[#28352e] border border-[#cbd4c9] dark:border-[#2f3e36] text-[#1c2420] dark:text-[#e5e9e3] transition"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Direct PDF Actions */}
      <div className="w-full rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-[#e5e9e3] dark:bg-[#1a231e] shadow-sm p-6">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <FileText className="w-12 h-12 text-[#355843] dark:text-[#63a375]" />
          <div>
            <p className="text-base font-semibold mb-1">My resume</p>
            <p className="text-xs text-[#52635a] dark:text-[#a3b3a9]">
              You can open or download my resume.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#355843] text-white text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" /> Open PDF
            </a>
            <a
              href={resumeUrl}
              download="Jeremiah_Zhiya_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#e5e9e3] dark:bg-[#243029] text-[#1c2420] dark:text-[#e5e9e3] text-sm font-semibold border border-[#cbd4c9] dark:border-[#2f3e36]"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}