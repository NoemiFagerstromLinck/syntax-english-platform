import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { AxisReadout, Meter, PageHeader, SectionTitle, Tag } from "@/components/syntax/primitives";
import { LEVELS, competencyDomains, student } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/competencies")({
  head: () => ({
    meta: [
      { title: "Competency Profile — dCoder" },
      { name: "description", content: "Progression through Entry level, Junior, Mid and Senior professional communication competencies." },
      { property: "og:title", content: "Competency Profile — dCoder" },
      { property: "og:description", content: "See how your workplace English communication develops from Foundation to Senior." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Competencies,
});

function Competencies() {
  const [domainId, setDomainId] = useState(competencyDomains[2]!.id);
  const domain = competencyDomains.find((d) => d.id === domainId) ?? competencyDomains[0]!;

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Communication competency framework"
        title="Competency Profile"
        description="How effectively you operate in English across real engineering situations. Each domain progresses independently from Entry level to Senior."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Overall communication level</p>
          <p className="mt-3 font-display text-5xl font-semibold text-comm">{student.communication.current}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {student.communication.progressToNext}% of the way to {student.communication.target}
          </p>
          <Meter value={student.communication.progressToNext} className="mt-4 max-w-xs" label="Progress to next level" />
        </div>
        <div>
          <p className="mb-3 text-sm text-muted-foreground">Three separate measures — a senior engineer can still be building their communication level, and vice versa.</p>
          <AxisReadout compact technical={`${student.technical.seniority} · ${student.technical.years} years in frontend`} english={`${student.english.level} · general English ability`} communication={`${student.communication.current} · workplace performance in English`} />
        </div>
      </section>

      <section>
        <SectionTitle index="01" title="Competency matrix" aside={<span className="hidden text-xs text-muted-foreground sm:inline">Select a domain to see descriptors</span>} />
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface">
                <th scope="col" className="px-5 py-3 text-left font-normal"><span className="eyebrow">Domain</span></th>
                {LEVELS.map((l) => (
                  <th key={l} scope="col" className="px-3 py-3 text-left font-normal"><span className="eyebrow">{l}</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competencyDomains.map((d) => {
                const active = d.id === domainId;
                return (
                  <tr key={d.id} className={cn("border-b border-hairline last:border-b-0 transition-colors", active ? "bg-surface-raised" : "hover:bg-surface")}>
                    <th scope="row" className="px-5 py-3 text-left font-normal">
                      <button onClick={() => setDomainId(d.id)} aria-pressed={active} className={cn("text-left", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                        {d.name}
                      </button>
                    </th>
                    {LEVELS.map((l, i) => {
                      const reached = i < d.level;
                      const current = i === d.level;
                      return (
                        <td key={l} className="px-3 py-3">
                          <div className="h-2 overflow-hidden rounded-full bg-secondary" aria-label={`${l}: ${reached ? "achieved" : current ? `${d.progress}% in progress` : "not started"}`}>
                            <div className={cn("h-full rounded-full", reached ? "w-full bg-positive" : current ? "bg-comm/60" : "w-0")} style={current ? { width: `${d.progress}%` } : undefined} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="animate-rise" key={domain.id}>
        <SectionTitle index="02" title={domain.name} aside={<Tag tone="comm">Working on {LEVELS[domain.level]}</Tag>} />
        <ol className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-4">
          {LEVELS.map((l, i) => {
            const reached = i < domain.level;
            const current = i === domain.level;
            return (
              <li key={l} className={cn("bg-surface p-5", current && "bg-comm-soft")}>
                <div className="flex items-center justify-between">
                  <span className={cn("font-display text-lg font-semibold", reached || current ? "text-foreground" : "text-muted-foreground")}>{l}</span>
                  {reached ? <Check className="size-4 text-positive" aria-label="Achieved" /> : current ? <span className="font-mono text-xs text-comm">{domain.progress}%</span> : null}
                </div>
                <ul className="mt-4 space-y-3">
                  {domain.descriptors[l].map((d) => (
                    <li key={d} className={cn("text-sm leading-relaxed", reached || current ? "text-foreground/90" : "text-muted-foreground")}>
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2">Evidence</span>
          {domain.evidence.map((e) => (
            <Tag key={e}>{e}</Tag>
          ))}
        </div>
      </section>
    </div>
  );
}
