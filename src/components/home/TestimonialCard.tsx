import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface TestimonialCardProps {
  name: string;
  meta: string;
  badge?: string;
  image?: string;
  imageAlt: string;
  content: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialCard({
  name,
  meta,
  badge,
  image,
  imageAlt,
  content,
}: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/3] w-full bg-neutral-100">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage-500 via-sage-600 to-sky-600">
            <span className="text-5xl font-bold tracking-tight text-white/90 md:text-6xl">
              {getInitials(name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {badge && (
            <span className="mb-2 inline-block rounded-full bg-sage-500/90 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm">
              {badge}
            </span>
          )}
          <p className="text-lg font-bold leading-tight">{name}</p>
          <p className="mt-1 text-sm text-white/90">{meta}</p>
        </div>
      </div>

      <blockquote className="flex flex-1 flex-col p-6 md:p-7">
        <svg
          aria-hidden
          className="mb-4 h-8 w-8 text-sage-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-2.866 3.011l-.195.008c-1.933 0-3.566-1.269-3.847-3.004ZM14.583 17.321c-1.03-1.094-1.583-2.321-1.583-4.31 0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-2.866 3.011l-.195.008c-1.933 0-3.566-1.269-3.847-3.004Z" />
        </svg>
        <div className="space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
          {content.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </blockquote>
    </Card>
  );
}
