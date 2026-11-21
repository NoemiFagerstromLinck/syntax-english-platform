import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Video } from "lucide-react";
import { PageHeader, ScoreDots, SectionTitle, Tag } from "@/components/syntax/primitives";
import { nextSession, pastReviews, upcomingSessions } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Tutor Sessions — Syntax" },
      { name: "description", content: "Individual 1:1 sprint reviews, tutor feedback and personalised development objectives." },
      { property: "og:title", content: "Tutor Sessions — Syntax" },
      { property: "og:description", content: "1:1 sprint reviews with your tutor, detailed feedback and agreed development objectives." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sessions,
});

function Sessions() {
  const [done, setDone] = useState<Record<string, boolean>>({ p2: true });
  const [reviewId, setReviewId] = useState(pastReviews[0]!.id);
  const review = pastReviews.find((r) => r.id === reviewId) ?? pastReviews[0]!;
  const prepCount = nextSession.prep.filter((p) => done[p.id]).length;

  return (
    <div className="space-y-12">
      <PageHeader eyebrow="1:1 with your tutor" title="Tutor Sessions" description="Each sprint closes with an individual review. Your tutor assesses your work, gives detailed feedback and agrees your next development objectives with you." />

      {/* Next session */}
      <section className="panel grid overflow-hidden lg:grid-cols-[1.3fr_1fr]">
        <div className="bg-grid p-6 md:p-8">
          <Tag tone="comm">Next session</Tag>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">{nextSession.type}</h2>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {nextSession.date} · {nextSession.time}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-secondary font-mono text-xs text-foreground">DO</span>
            <div>
              <p className="text-sm font-medium text-foreground">{nextSession.tutor}</p>
              <p className="text-xs text-muted-foreground">Communication tutor · ex-Staff Engineer</p>
            </div>
          </div>
          <p className="eyebrow mt-8">Agenda</p>
          <ol className="mt-3 space-y-2">
            {nextSession.agenda.map((a, i) => (
              <li key={a} className="flex gap-3 text-sm text-foreground">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                {a}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col border-t border-hairline p-6 md:p-8 lg:border-l lg:border-t-0">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Preparation</p>
            <span className="font-mono text-xs text-comm">
              {prepCount}/{nextSession.prep.length}
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {nextSession.prep.map((p) => {
              const checked = !!done[p.id];
              return (
                <li key={p.id}>
                  <button
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => setDone((d) => ({ ...d, [p.id]: !checked }))}
                    className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-raised"
                  >
                    <span className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded border", checked ? "border-comm bg-comm text-primary-foreground" : "border-muted-foreground/50")}>
                      {checked ? <Check className="size-3" /> : null}
                    </span>
                    <span className={checked ? "text-muted-foreground line-through" : "text-foreground"}>{p.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-8">
            <button
              onClick={() => toast("Session room opens 10 minutes before start", { description: "Video rooms are not connected in this prototype." })}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Video className="size-4" /> Join session room
            </button>
            <button onClick={() => toast("Reschedule request sent", { description: "Daniel will propose a new time." })} className="mt-2 w-full py-2 text-sm text-muted-foreground hover:text-foreground">
              Request a different time
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle index="01" title="Scheduled" />
        <ul className="divide-y divide-hairline border-y border-hairline">
          {upcomingSessions.map((s) => (
            <li key={s.id} className="grid gap-1 py-4 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-6">
              <span className="font-mono text-xs text-muted-foreground">
                {s.date}
                <br className="hidden md:block" /> <span className="md:hidden">· </span>
                {s.time}
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">{s.type}</span>
                <span className="block text-sm text-muted-foreground">{s.focus}</span>
              </span>
              <span className="text-xs text-muted-foreground">{s.tutor}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Review history */}
      <section>
        <SectionTitle index="02" title="Sprint reviews & feedback" />
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" aria-label="Past reviews">
            {pastReviews.map((r) => (
              <li key={r.id} className="shrink-0">
                <button
                  onClick={() => setReviewId(r.id)}
                  aria-pressed={r.id === reviewId}
                  className={cn("w-full rounded-lg border px-4 py-3 text-left transition-colors", r.id === reviewId ? "border-comm/40 bg-surface-raised" : "border-transparent hover:bg-surface")}
                >
                  <span className="block font-mono text-[11px] text-muted-foreground">
                    {r.sprint} · {r.date}
                  </span>
                  <span className="mt-1 block text-sm text-foreground">{r.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <article key={review.id} className="animate-rise space-y-8">
            <div>
              <p className="eyebrow">
                Feedback from {review.tutor} · {review.date}
              </p>
              <p className="mt-3 font-display text-xl leading-relaxed text-foreground">“{review.summary}”</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="eyebrow text-positive">Strengths</p>
                <ul className="mt-3 space-y-2">
                  {review.strengths.map((s) => (
                    <li key={s} className="border-l-2 border-positive/40 pl-3 text-sm text-foreground">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-attention">Focus areas</p>
                <ul className="mt-3 space-y-2">
                  {review.focus.map((s) => (
                    <li key={s} className="border-l-2 border-attention/40 pl-3 text-sm text-foreground">{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="eyebrow">Assessment rubric</p>
              <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {review.scores.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4 border-b border-hairline pb-2">
                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="flex items-center gap-3">
                      <ScoreDots value={s.value} label={s.label} />
                      <span className="font-mono text-xs text-foreground">{s.value}/5</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="eyebrow">Personalised development objectives</p>
              <ul className="mt-3 space-y-2">
                {review.objectives.map((o) => (
                  <li key={o.text} className="flex items-center justify-between gap-4 rounded-lg bg-surface px-4 py-3">
                    <span className="text-sm text-foreground">{o.text}</span>
                    <Tag tone={o.status === "Achieved" ? "positive" : "comm"}>{o.status}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
