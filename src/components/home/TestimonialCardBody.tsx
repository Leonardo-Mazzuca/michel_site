"use client";

import { useId, useState } from "react";

interface TestimonialCardBodyProps {
  excerpt: string;
  content: string;
  readMore: string;
  readLess: string;
}

export function TestimonialCardBody({
  excerpt,
  content,
  readMore,
  readLess,
}: TestimonialCardBodyProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const isExpandable = excerpt.trim() !== content.trim();

  const paragraphs = (expanded ? content : excerpt).split("\n\n").filter(Boolean);

  return (
    <blockquote className="flex flex-1 flex-col p-6 md:p-7">
      <svg
        aria-hidden
        className="mb-3 h-6 w-6 text-sage-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-2.866 3.011l-.195.008c-1.933 0-3.566-1.269-3.847-3.004ZM14.583 17.321c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-2.866 3.011l-.195.008c-1.933 0-3.566-1.269-3.847-3.004Z" />
      </svg>

      <div
        id={contentId}
        className={`relative space-y-3 text-sm leading-relaxed text-neutral-700 md:text-[0.95rem] ${
          !expanded && isExpandable ? "max-h-36 overflow-hidden" : ""
        }`}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        {!expanded && isExpandable && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent"
          />
        )}
      </div>

      {isExpandable && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 self-start text-sm font-semibold text-sage-700 transition-colors hover:text-sage-800"
        >
          {expanded ? readLess : readMore}
        </button>
      )}
    </blockquote>
  );
}
