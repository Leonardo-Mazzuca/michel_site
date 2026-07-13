interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm ${
        hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
