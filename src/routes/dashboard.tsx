import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Check } from "lucide-react";
import { Meter, Tag } from "@/components/syntax/primitives";
import { LEVELS, currentSprint, sprintDeliverable, sprintPlan, student, upcomingSessions } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — dCoder" },
      { name: "description", content: "Your current sprint, upcoming tutor sessions, learning objectives and professional communication pathway." },
      { property: "og:title", content: "Dashboard — dCoder" },
      { property: "og:description", content: "Track your sprint, tutor sessions and professional English communication pathway." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const levelNotes: Record<(typeof LEVELS)[number], string> = {
  "Entry level": "Understands the basics and can introduce themselves at work.",
  Junior: "Joins stand-ups and writes simple updates in English.",
  Mid: "Explains decisions and handles most meetings without support.",
  Senior: "Leads discussions, writes proposals and mentors others.",
};

function Dashboard() {
  const first = student.name.split(" ")[0];
  const session = upcomingSessions[0]!;
  const currentIndex = LEVELS.indexOf(student.communication.current);
  const nextLevel = LEVELS[currentIndex + 1];

  return (
    <div className="space-y-8">
      <header className="animate-rise max-w-xl">
        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">Good afternoon, {first}.</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          You are mid-sprint: the blocking vs. non-blocking exercise today, the review comment rewrites before Friday&rsquo;s review.
        </p>
      </header>

      <section className="animate-rise panel p-6 md:p-8" aria-labelledby="level-title">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="level-title" className="text-xl font-semibold text-foreground">Your English at work</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Same levels you already know from your career, not exam grades.
            </p>
          </div>
          <Tag tone="tech">Technical: {student.technical.seniority} frontend · {student.technical.years} yrs</Tag>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-1.5" role="img" aria-label={nextLevel ? `English level: ${student.communication.current}, ${student.communication.progressToNext}% toward ${nextLevel}` : `English level: ${student.communication.current}`}>
          {LEVELS.map((level, i) => {
            const complete = i < currentIndex;
            const current = i === currentIndex;
            return (
              <div key={level} className="min-w-0">
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width] duration-700 ease-out",
                      complete ? "bg-positive" : current ? "bg-comm" : "bg-transparent",
                    )}
                    style={{ width: complete ? "100%" : current ? `${student.communication.progressToNext}%` : "0%" }}
                  />
                </div>
                <p className={cn("mt-2 text-[11px] leading-tight sm:text-xs", i <= currentIndex ? "text-foreground" : "text-muted-foreground")}>{level}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold leading-none text-comm">{student.communication.current}</span>
            <span className="text-xs text-muted-foreground">
              {nextLevel ? `${student.communication.progressToNext}% toward ${nextLevel}` : "Highest level reached"}
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">{levelNotes[student.communication.current]}</p>
        </div>
      </section>

      <section className="animate-rise panel overflow-hidden" aria-labelledby="sprint-title">
        <div className="flex flex-wrap items-start justify-between gap-4 p-6 md:p-8">
          <div className="max-w-2xl">
            <Tag tone="comm">{currentSprint.code} · Sprint plan</Tag>
            <h2 id="sprint-title" className="mt-3 text-2xl font-semibold leading-snug text-foreground">{currentSprint.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground">Sprint goal:</span> {currentSprint.scenario}
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">Day {currentSprint.currentDay} of {currentSprint.totalDays}</span>
        </div>

        <dl className="grid gap-px border-y border-hairline bg-hairline sm:grid-cols-[1.5fr_1fr_1fr]">
          <div className="bg-surface px-5 py-4 md:px-8">
            <dt className="text-xs text-muted-foreground">Sprint progress</dt>
            <dd className="mt-2 flex items-center gap-3">
              <Meter value={currentSprint.progress} tone="comm" className="flex-1" label="Sprint progress" />
              <span className="font-mono text-xs text-comm">{currentSprint.progress}%</span>
            </dd>
          </div>
          <div className="bg-surface px-5 py-4 md:px-6">
            <dt className="text-xs text-muted-foreground">Tasks completed</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {sprintPlan.completed} of {sprintPlan.total}
            </dd>
          </div>
          <div className="bg-surface px-5 py-4 md:px-6">
            <dt className="text-xs text-muted-foreground">Focus time</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {sprintPlan.focusedTime} <span className="font-normal text-muted-foreground">of {sprintPlan.plannedTime}</span>
            </dd>
          </div>
        </dl>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-foreground">{sprintPlan.weekLabel}</h3>
            <span className="font-mono text-xs text-muted-foreground">Planning → Review &amp; retrospective</span>
          </div>
          <ol className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5" aria-label="Sprint week">
            {sprintPlan.days.map((d) => {
              const done = d.status === "done";
              const current = d.status === "current";
              return (
                <li
                  key={d.day}
                  aria-current={current ? "step" : undefined}
                  title={d.detail}
                  className={cn(
                    "rounded-lg border p-3 last:col-span-2 sm:last:col-span-1",
                    current ? "border-comm/50 bg-comm-soft" : "border-hairline bg-surface",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("font-mono text-[11px] uppercase tracking-wider", current ? "text-comm" : "text-muted-foreground")}>{d.day}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-muted-foreground">{d.date}</span>
                      {done ? <Check className="size-3.5 text-positive" aria-label="Completed" /> : null}
                      {current ? <span className="size-2 rounded-full bg-comm" aria-label="Today" /> : null}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug text-foreground">{d.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.duration}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              to="/sprint"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continue lesson <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to="/learning-pad" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Practise in the learning pad
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <section className="animate-rise panel flex flex-col p-6" aria-labelledby="deliverable-title">
          <div className="flex items-center justify-between gap-3">
            <h2 id="deliverable-title" className="text-base font-medium text-foreground">Sprint deliverable</h2>
            <span className="font-mono text-xs text-muted-foreground">{sprintDeliverable.due}</span>
          </div>
          <p className="mt-3 font-display text-xl font-semibold leading-snug text-foreground">{sprintDeliverable.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sprintDeliverable.detail}</p>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">{sprintDeliverable.meta}</p>
          <Link to="/sprint" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-comm hover:underline">
            Open deliverable <ArrowRight className="size-4" aria-hidden />
          </Link>
        </section>

        <section className="animate-rise panel flex flex-col p-6" aria-labelledby="session-title">
          <div className="flex items-center justify-between gap-3">
            <h2 id="session-title" className="text-base font-medium text-foreground">Next tutor session</h2>
            <Link to="/sessions" className="text-xs text-comm hover:underline">All sessions</Link>
          </div>
          <p className="mt-3 font-display text-xl font-semibold text-foreground">{session.date}</p>
          <p className="mt-1 text-sm text-muted-foreground">{session.time} · {session.tutor}</p>
          <p className="mt-3 text-sm font-medium text-foreground">{session.type}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{session.focus}</p>
          <Link
            to="/sessions"
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-foreground transition-colors hover:text-comm"
          >
            <CalendarClock className="size-4 text-comm" aria-hidden /> Prepare for the review
          </Link>
        </section>
      </div>
    </div>
  );
}
