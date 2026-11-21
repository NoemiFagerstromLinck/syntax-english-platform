import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Meter, Tag } from "@/components/syntax/primitives";
import { LEVELS, currentSprint, sprintTasks, student, upcomingSessions } from "@/data/platform";
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

const levelNotes: Record<(typeof LEVELS)[number], string> = {
  "Entry level": "Understands the basics and can introduce themselves at work.",
  Junior: "Joins stand-ups and writes simple updates in English.",
  Mid: "Explains decisions and handles most meetings without support.",
  Senior: "Leads discussions, writes proposals and mentors others.",
};

function Dashboard() {
  const first = student.name.split(" ")[0];
  const nextTask = sprintTasks.find((t) => t.status === "in-progress") ?? sprintTasks.find((t) => t.status === "todo")!;
  const session = upcomingSessions[0]!;
  const currentIndex = LEVELS.indexOf(student.communication.current);
  const nextLevel = LEVELS[currentIndex + 1];

  return (
    <div className="space-y-8">
      <header className="animate-rise max-w-xl">
        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">Good afternoon, {first}.</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Your next step is the blocking vs. non-blocking exercise, then the review comment rewrites before Tuesday.
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
                    className={cn("h-full rounded-full transition-[width] duration-700 ease-out", complete || current ? "bg-comm" : "bg-transparent")}
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

      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <section className="animate-rise panel bg-grid flex flex-col overflow-hidden p-6 md:p-8" aria-labelledby="next-step-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tag tone="comm">Up next</Tag>
            <span className="font-mono text-xs text-muted-foreground">
              {currentSprint.code} · Day {currentSprint.currentDay}/{currentSprint.totalDays}
            </span>
          </div>
          <h2 id="next-step-title" className="mt-4 text-2xl font-semibold leading-snug text-foreground">{nextTask.title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {nextTask.kind} · {nextTask.duration} · {currentSprint.title}
          </p>
          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Sprint progress</span>
              <span className="font-mono text-xs text-comm">{currentSprint.progress}%</span>
            </div>
            <Meter value={currentSprint.progress} tone="comm" className="mt-2" label="Sprint progress" />
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                to="/sprint"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Continue lesson <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link to="/sprint" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                See the full sprint
              </Link>
            </div>
          </div>
        </section>

        <section className="animate-rise panel flex flex-col p-6" aria-labelledby="session-title">
          <div className="flex items-center justify-between gap-3">
            <h2 id="session-title" className="text-base font-medium text-foreground">Next tutor session</h2>
            <Link to="/sessions" className="text-xs text-comm hover:underline">All sessions</Link>
          </div>
          <p className="mt-4 font-display text-2xl font-semibold text-foreground">{session.date}</p>
          <p className="mt-1 text-sm text-muted-foreground">{session.time} · {session.tutor}</p>
          <p className="mt-4 text-sm font-medium text-foreground">{session.type}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{session.focus}</p>
          <Link
            to="/sessions"
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-foreground transition-colors hover:text-comm"
          >
            <CalendarClock className="size-4 text-comm" aria-hidden /> Prepare for the session
          </Link>
        </section>
      </div>
    </div>
  );
}
