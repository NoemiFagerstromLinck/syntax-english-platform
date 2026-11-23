import { cn } from "@/lib/utils";

function BeeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 58" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="16" cy="24" rx="15" ry="7.5" transform="rotate(-24 16 24)" fill="var(--comm)" opacity="0.9" />
      <ellipse cx="48" cy="24" rx="15" ry="7.5" transform="rotate(24 48 24)" fill="var(--comm)" opacity="0.9" />

      <path d="M27 24C24.5 19.5 23 17 21 14.5" stroke="var(--foreground)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="13.5" r="2" fill="var(--comm)" />
      <path d="M37 24C39.5 19.5 41 17 43 14.5" stroke="var(--foreground)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="44" cy="13.5" r="2" fill="var(--comm)" />

      <g fill="var(--foreground)">
        <circle cx="32" cy="33" r="12" />
        <circle cx="22" cy="28" r="4.5" />
        <circle cx="42" cy="28" r="4.5" />
        <circle cx="22" cy="38" r="4.5" />
        <circle cx="42" cy="38" r="4.5" />
        <circle cx="32" cy="23" r="4.5" />
        <circle cx="32" cy="44" r="4.5" />
      </g>

      <path d="M25.5 32.5c1.6 1.8 3.2 1.8 4.8 0" stroke="var(--background)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33.7 32.5c1.6 1.8 3.2 1.8 4.8 0" stroke="var(--background)" strokeWidth="1.8" strokeLinecap="round" />

      <g stroke="var(--foreground)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M23 44l-3.5 4" />
        <path d="M28.5 46l-1 4.5" />
        <path d="M35.5 46l1 4.5" />
        <path d="M41 44l3.5 4" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
  showTagline = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}) {
  const wordmark = size === "lg" ? "text-4xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span className={cn("relative inline-block pt-[1.32em] font-logo font-semibold leading-none tracking-[-0.02em] text-foreground", wordmark)}>
        <BeeMark className="absolute left-[0.3em] top-0 h-auto w-[1.6em] -translate-x-1/2" />
        <span className="text-comm">d</span>Coder
      </span>
      {showTagline ? (
        <span className="mt-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">Dcoding barriers</span>
      ) : null}
    </span>
  );
}
