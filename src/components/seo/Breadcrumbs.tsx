import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { getBreadcrumbSchema, type BreadcrumbItem, type Locale } from "@/lib/seo";

interface BreadcrumbsProps {
  locale: Locale;
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ locale, items, className = "" }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <>
      <JsonLdGraph schemas={[getBreadcrumbSchema(locale, items)]} />
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-neutral-600 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                )}
                {isLast ? (
                  <span className="font-medium text-neutral-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path || "/"}
                    className="transition-colors hover:text-sage-700"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
