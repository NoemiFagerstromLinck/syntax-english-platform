import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="animate-rise flex flex-col gap-6 border-b border-hairline pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({ index, title, aside }: { index?: string; title: string; aside?: ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="flex items-baseline gap-3 text-lg font-medium text-foreground">
        {index ? <span className="font-mono text-xs text-muted-foreground">{index}</span> : null}
        {title}
      </h2>
      {aside}
    </div>
  );
}

type Tone = "comm" | "tech" | "lang" | "neutral" | "positive" | "attention";

const toneBar: Record<Tone, string> = {
  comm: "bg-comm",
  tech: "bg-tech",
  lang: "bg-lang",
  neutral: "bg-muted-foreground",
  positive: "bg-positive",
  attention: "bg-attention",
};

export function Meter({ value, tone = "comm", className, label }: { value: number; tone?: Tone; className?: string; label?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className)}
    >
      <div className={cn("h-full rounded-full transition-all duration-700", toneBar[tone])} style={{ width: `${value}%` }} />
    </div>
  );
}

const toneTag: Record<Tone, string> = {
  comm: "border-comm/30 bg-comm-soft text-comm",
  tech: "border-tech/30 bg-tech-soft text-tech",
  lang: "border-lang/30 bg-lang-soft text-lang",
  neutral: "border-hairline bg-secondary text-secondary-foreground",
  positive: "border-positive/30 bg-positive/10 text-positive",
  attention: "border-attention/30 bg-attention/10 text-attention",
};

export function Tag({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wide", toneTag[tone], className)}>
      {children}
    </span>
  );
}

/** Three-axis readout: technical seniority, English proficiency and communication level are never merged. */
export function AxisReadout({
  technical,
  english,
  communication,
  compact = false,
}: {
  technical: string;
  english: string;
  communication: string;
  compact?: boolean;
}) {
  const items = [
    { label: "Technical seniority", value: technical, dot: "bg-tech" },
    { label: "English proficiency", value: english, dot: "bg-lang" },
    { label: "Communication level", value: communication, dot: "bg-comm" },
  ];
  return (
    <dl className={cn("grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3")}>
      {items.map((i) => (
        <div key={i.label} className="bg-surface px-4 py-3">
          <dt className="flex items-center gap-2 eyebrow">
            <span className={cn("size-1.5 rounded-full", i.dot)} aria-hidden />
            {i.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ScoreDots({ value, max = 5, tone = "comm", label }: { value: number; max?: number; tone?: Tone; label: string }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${label}: ${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={cn("h-1.5 w-4 rounded-full", i < value ? toneBar[tone] : "bg-secondary")} />
      ))}
    </span>
  );
}
