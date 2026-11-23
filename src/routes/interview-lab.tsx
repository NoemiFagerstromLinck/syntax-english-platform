import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Mic, RotateCcw, Square, Timer } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, ScoreDots, SectionTitle, Tag } from "@/components/syntax/primitives";
import { interviewHistory, interviewTracks, type Simulation, type Track } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interview-lab")({
  head: () => ({
    meta: [
      { title: "Interview Lab — dCoder" },
      { name: "description", content: "Frontend, backend and full-stack technical interview simulations in English." },
      { property: "og:title", content: "Interview Lab — dCoder" },
      { property: "og:description", content: "Rehearse frontend, backend and full-stack interviews in English with structured debriefs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InterviewLab,
});

const tracks: Track[] = ["frontend", "backend", "fullstack"];

function InterviewLab() {
  const [track, setTrack] = useState<Track>("frontend");
  const [active, setActive] = useState<Simulation | null>(null);
  const data = interviewTracks[track];

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Simulated interview rounds"
        title="Interview Lab"
        description="Practise realistic interview rounds. Every debrief scores your technical content and your English communication separately."
      />

      {active ? (
        <SimulationRunner sim={active} trackLabel={data.label} onExit={() => setActive(null)} />
      ) : (
        <>
          <section>
            <div role="tablist" aria-label="Interview track" className="inline-flex rounded-xl border border-hairline bg-surface p-1">
              {tracks.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={t === track}
                  onClick={() => setTrack(t)}
                  className={cn("rounded-lg px-4 py-2 text-sm transition-colors", t === track ? "bg-surface-raised text-foreground" : "text-muted-foreground hover:text-foreground")}
                >
                  {interviewTracks[t].label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{data.description}</p>
          </section>

          <section key={track} className="animate-rise">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {data.simulations.map((s, i) => (
                <li key={s.id} className="grid gap-4 py-6 md:grid-cols-[48px_1fr_220px_auto] md:items-center">
                  <span className="font-display text-2xl font-light text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Tag tone="tech">{s.format}</Tag>
                      <Tag>{s.duration}</Tag>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">Interviewer: {s.interviewer}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Language focus</p>
                    <p className="mt-1 text-sm text-lang">{s.languageFocus}</p>
                  </div>
                  <button onClick={() => setActive(s)} className="inline-flex h-10 items-center gap-2 justify-self-start rounded-lg border border-hairline px-4 text-sm text-foreground transition-colors hover:border-comm/50 hover:text-comm">
                    Start <ArrowRight className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle index="01" title="Recent simulations" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    <th className="pb-3 font-normal"><span className="eyebrow">Simulation</span></th>
                    <th className="pb-3 font-normal"><span className="eyebrow">Date</span></th>
                    <th className="pb-3 font-normal"><span className="eyebrow text-tech">Technical content</span></th>
                    <th className="pb-3 font-normal"><span className="eyebrow text-lang">English communication</span></th>
                  </tr>
                </thead>
                <tbody>
                  {interviewHistory.map((h) => (
                    <tr key={h.id} className="border-b border-hairline">
                      <td className="py-3">
                        <span className="block text-foreground">{h.title}</span>
                        <span className="text-xs text-muted-foreground">{h.track}</span>
                      </td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{h.date}</td>
                      <td className="py-3"><ScoreDots value={h.technical} tone="tech" label="Technical content" /></td>
                      <td className="py-3"><ScoreDots value={h.communication} tone="lang" label="English communication" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function useTimer(running: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function SimulationRunner({ sim, trackLabel, onExit }: { sim: Simulation; trackLabel: string; onExit: () => void }) {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const time = useTimer(!finished);
  const question = sim.questions[step] ?? "";
  const last = step === sim.questions.length - 1;

  if (finished) return <Debrief sim={sim} time={time} onExit={onExit} onRetry={() => { setStep(0); setFinished(false); setNotes({}); }} />;

  return (
    <section className="animate-rise panel overflow-hidden" aria-label="Interview simulation">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-full bg-attention" aria-hidden />
          <span className="text-sm text-foreground">{sim.title}</span>
          <Tag tone="tech">{trackLabel}</Tag>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground" aria-label={`Elapsed ${time}`}>
            <Timer className="size-4" aria-hidden /> {time}
          </span>
          <button onClick={() => setFinished(true)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Square className="size-3.5" /> End
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="p-6 md:p-8">
          <div className="flex gap-1.5" aria-label={`Question ${step + 1} of ${sim.questions.length}`}>
            {sim.questions.map((_, i) => (
              <span key={i} className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-comm" : "bg-secondary")} />
            ))}
          </div>
          <p className="eyebrow mt-6">
            Question {step + 1} of {sim.questions.length} · {sim.interviewer}
          </p>
          <p key={step} className="animate-rise mt-3 font-display text-2xl leading-snug text-foreground">{question}</p>

          <div className="mt-8 flex items-center gap-3 rounded-lg border border-dashed border-hairline px-4 py-3 text-sm text-muted-foreground">
            <Mic className="size-4 text-comm" aria-hidden />
            Answer out loud as you would in a real interview. Voice recording arrives in a later release.
          </div>

          <label htmlFor="notes" className="mt-6 block text-sm text-muted-foreground">Notes or outline</label>
          <Textarea
            id="notes"
            value={notes[step] ?? ""}
            onChange={(e) => setNotes((n) => ({ ...n, [step]: e.target.value }))}
            placeholder="Situation → Task → Action → Result"
            className="mt-2 min-h-28 border-hairline bg-background font-mono text-[13px]"
          />
          <div className="mt-6 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-40">
              Previous
            </button>
            <button
              onClick={() => (last ? setFinished(true) : setStep((s) => s + 1))}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {last ? "Finish & debrief" : "Next question"} <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <aside className="border-t border-hairline bg-surface-raised/40 p-6 lg:border-l lg:border-t-0">
          <p className="eyebrow text-lang">Language cues</p>
          <p className="mt-1 text-xs text-muted-foreground">{sim.languageFocus}</p>
          <ul className="mt-4 space-y-2">
            {sim.phrases.map((p) => (
              <li key={p} className="rounded-md border border-lang/20 bg-lang-soft px-3 py-2 font-mono text-xs text-foreground">{p}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Debrief({ sim, time, onExit, onRetry }: { sim: Simulation; time: string; onExit: () => void; onRetry: () => void }) {
  const technical = [
    { label: "Accuracy of concepts", value: 4 },
    { label: "Depth of reasoning", value: 3 },
    { label: "Trade-off awareness", value: 4 },
  ];
  const english = [
    { label: "Clarity & structure", value: 3 },
    { label: "Fluency", value: 3 },
    { label: "Vocabulary range", value: 4 },
    { label: "Grammatical accuracy", value: 3 },
  ];
  return (
    <section className="animate-rise space-y-8" aria-label="Simulation debrief">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Tag tone="positive">Simulation complete · {time}</Tag>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">{sim.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sample debrief — your tutor reviews full recordings in your next session.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onRetry} className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline px-4 text-sm text-foreground hover:border-comm/40">
            <RotateCcw className="size-4" /> Retry
          </button>
          <button onClick={onExit} className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
            Back to Interview Lab
          </button>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-2">
        {[
          { title: "Technical content", tone: "tech" as const, rows: technical, note: "Solid understanding. Add one concrete metric when describing impact." },
          { title: "English communication", tone: "lang" as const, rows: english, note: "Signpost your answer first: “There are two main reasons…”. Watch past simple vs present perfect." },
        ].map((col) => (
          <div key={col.title} className="bg-surface p-6">
            <p className={cn("eyebrow", col.tone === "tech" ? "text-tech" : "text-lang")}>{col.title}</p>
            <dl className="mt-4 space-y-3">
              {col.rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">{r.label}</dt>
                  <dd><ScoreDots value={r.value} tone={col.tone} label={r.label} /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-hairline pt-4 text-sm leading-relaxed text-foreground">{col.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
