import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/lib/config";

interface InstagramLinksProps {
  locale: "pt" | "en";
  iconSize?: string;
  className?: string;
}

export function InstagramLinks({
  locale,
  iconSize = "h-4 w-4",
  className = "",
}: InstagramLinksProps) {
  const accounts = [siteConfig.instagram.canada, siteConfig.instagram.brazil];

  return (
    <div className={`space-y-2 ${className}`}>
      {accounts.map((account) => (
        <a
          key={account.handle}
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-sage-700"
          aria-label={`Instagram ${account.label[locale]}`}
        >
          <InstagramIcon className={`${iconSize} text-sage-600`} />
          <span>
            {account.handle}{" "}
            <span className="text-neutral-400">({account.label[locale]})</span>
          </span>
        </a>
      ))}
    </div>
  );
}
