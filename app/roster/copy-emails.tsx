'use client';

import { useState } from 'react';

export default function CopyEmails({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);
  const emailText = emails.join(', ');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Email List</h2>
        <button
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-main/15 text-main border border-main/30 hover:bg-main/25 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <div className="bg-[#111] border border-white/15 rounded-xl px-5 py-4">
        <p className="text-gray-400 text-xs leading-relaxed break-all select-all">
          {emailText}
        </p>
      </div>
    </div>
  );
}
