import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TestimonialCardBody } from "@/components/home/TestimonialCardBody";

interface TestimonialCardProps {
  name: string;
  meta: string;
  badge?: string;
  image?: string;
  imageAlt: string;
  excerpt: string;
  content: string;
  readMore: string;
  readLess: string;
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
  excerpt,
  content,
  readMore,
  readLess,
}: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[5/4] w-full bg-neutral-100 sm:aspect-[4/3]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          {badge && (
            <span className="mb-2 inline-block rounded-full bg-sage-500/90 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm">
              {badge}
            </span>
          )}
          <p className="text-base font-bold leading-tight text-white md:text-lg">
            {name}
          </p>
          <p className="mt-1 text-xs text-white/90 md:text-sm">{meta}</p>
        </div>
      </div>

      <TestimonialCardBody
        excerpt={excerpt}
        content={content}
        readMore={readMore}
        readLess={readLess}
      />
    </Card>
  );
}
