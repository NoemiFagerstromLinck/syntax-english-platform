import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, CheckCircle2, Circle, CircleDot, PlayCircle, FileText, PenLine, BookOpen } from "lucide-react";
import { AxisReadout, Meter, PageHeader, SectionTitle, Tag } from "@/components/syntax/primitives";
import { currentSprint, learningObjectives, pathway, sprintTasks, student, upcomingSessions, type Task } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Syntax" },
      { name: "description", content: "Your current sprint, upcoming tutor sessions, learning objectives and professional communication pathway." },
      { property: "og:title", content: "Dashboard — Syntax" },
      { property: "og:description", content: "Track your sprint, tutor sessions and professional English communication pathway." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kindIcon: Record<Task["kind"], typeof PlayCircle> = {
  Video: PlayCircle,
  Ejercicio: PenLine,
  Tarea: FileText,
  Lectura: BookOpen,
};

function StatusIcon({ status }: { status: Task["status"] }) {
  if (status === "done") return <CheckCircle2 className="size-4 text-positive" aria-label="Done" />;
  if (status === "in-progress") return <CircleDot className="size-4 text-comm" aria-label="In progress" />;
  return <Circle className="size-4 text-muted-foreground" aria-label="To do" />;
}

function Dashboard() {
  const first = student.name.split(" ")[0];
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow={`Saturday, Nov 21 · ${currentSprint.code}, week 1`}
        title={<>Good afternoon, {first}.</>}
        description="Six days into the sprint. Your next step is the blocking vs. non-blocking exercise, then the review comment rewrites before Tuesday's session."
        actions={
          <Link to="/sprint" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Continue sprint <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      <AxisReadout
        technical={`${student.technical.seniority} ${student.role}`}
        english={`${student.english.cefr} · ${student.english.label}`}
        communication={`${student.communication.current} → ${student.communication.target}`}
      />

      {/* Sprint + sessions split */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="bg-grid border-b border-hairline p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tag tone="comm">{currentSprint.code} · Current sprint</Tag>
              <span className="font-mono text-xs text-muted-foreground">
                {currentSprint.start} — {currentSprint.end}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">{currentSprint.title}</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{currentSprint.scenario}</p>

            <div className="mt-6" aria-label={`Day ${currentSprint.currentDay} of ${currentSprint.totalDays}`}>
              <div className="flex gap-1">
                {Array.from({ length: currentSprint.totalDays }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-6 flex-1 rounded-sm",
                      i < currentSprint.currentDay - 1 ? "bg-comm/70" : i === currentSprint.currentDay - 1 ? "bg-comm ring-2 ring-comm/30" : "bg-secondary",
                    )}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                <span>Day 1</span>
                <span className="text-comm">Today · day {currentSprint.currentDay}</span>
                <span>Day {currentSprint.totalDays}</span>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-hairline">
            {sprintTasks.map((t) => {
              const Icon = kindIcon[t.kind];
              return (
                <li key={t.id}>
                  <Link to="/sprint" className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-surface-raised">
                    <StatusIcon status={t.status} />
                    <span className={cn("flex-1 text-sm", t.status === "done" ? "text-muted-foreground line-through decoration-hairline" : "text-foreground")}>{t.title}</span>
                    <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                      <Icon className="size-3.5" aria-hidden /> {t.kind}
                    </span>
                    <span className="w-14 text-right font-mono text-xs text-muted-foreground">{t.due ?? t.duration}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col">
          <SectionTitle
            title="Upcoming tutor sessions"
            aside={
              <Link to="/sessions" className="text-xs text-comm hover:underline">
                All sessions
              </Link>
            }
          />
          <ol className="relative flex-1 space-y-6 border-l border-hairline pl-6">
            {upcomingSessions.map((s, i) => (
              <li key={s.id} className="relative">
                <span className={cn("absolute -left-[29px] top-1 size-2.5 rounded-full border-2 border-background", i === 0 ? "bg-comm" : "bg-muted-foreground/50")} aria-hidden />
                <p className="font-mono text-xs text-muted-foreground">
                  {s.date} · {s.time}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{s.type}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{s.focus}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">with {s.tutor}</p>
              </li>
            ))}
          </ol>
          <Link to="/sessions" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm text-foreground transition-colors hover:border-comm/40">
            <CalendarClock className="size-4 text-comm" aria-hidden /> Prepare for Tuesday's review
          </Link>
        </div>
      </section>

      {/* Objectives */}
      <section>
        <SectionTitle
          index="01"
          title="Personal learning objectives"
          aside={
            <Link to="/sessions" className="text-xs text-muted-foreground hover:text-foreground">
              Agreed with your tutor
            </Link>
          }
        />
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {learningObjectives.map((o, i) => (
            <div key={o.id} className="grid grid-cols-[auto_1fr] gap-4 border-t border-hairline pt-5">
              <span className="font-display text-3xl font-light leading-none text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-sm leading-relaxed text-foreground">{o.text}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Meter value={o.progress} className="flex-1" label={`${o.text} progress`} />
                  <span className="font-mono text-xs text-muted-foreground">{o.progress}%</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Tag>{o.axis}</Tag>
                  <Tag>Target {o.target}</Tag>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pathway */}
      <section>
        <SectionTitle
          index="02"
          title="Professional communication pathway"
          aside={
            <Link to="/competencies" className="text-xs text-comm hover:underline">
              Competency details
            </Link>
          }
        />
        <div className="panel grid overflow-hidden md:grid-cols-4">
          {pathway.map((p) => (
            <div
              key={p.level}
              className={cn(
                "relative border-b border-hairline p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0",
                p.status === "current" && "bg-comm-soft",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{p.period}</span>
                {p.status === "complete" ? <CheckCircle2 className="size-4 text-positive" aria-label="Complete" /> : null}
                {p.status === "current" ? <Tag tone="comm">Current</Tag> : null}
              </div>
              <p className={cn("mt-4 font-display text-xl font-semibold", p.status === "future" ? "text-muted-foreground" : "text-foreground")}>{p.level}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.focus}</p>
              {p.status === "current" ? (
                <div className="mt-4">
                  <Meter value={student.communication.progressToNext} label="Progress to Mid-level" />
                  <p className="mt-2 font-mono text-[11px] text-comm">{student.communication.progressToNext}% toward Mid-level</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Communication levels describe how you operate in English at work. They are assessed separately from your technical seniority and your CEFR English level.
        </p>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-dashed border-hairline p-6 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Interview Lab</p>
          <p className="mt-1 text-foreground">Next suggested simulation: Frontend system design — real-time notification centre.</p>
        </div>
        <Link to="/interview-lab" className="inline-flex items-center gap-2 text-sm text-comm hover:underline">
          Open Interview Lab <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
