interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "soft" | "gradient";
}

const backgrounds = {
  white: "bg-white",
  soft: "bg-neutral-50",
  gradient: "bg-gradient-to-b from-sky-50/50 to-sage-50/30",
};

export function Section({
  children,
  className = "",
  id,
  background = "white",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold tracking-tight text-neutral-800 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 md:mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
