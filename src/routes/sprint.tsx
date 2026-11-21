import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Check, Pause, Play, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Meter, PageHeader, SectionTitle, Tag } from "@/components/syntax/primitives";
import { assignments, choiceExercise, currentSprint, materials, rewriteExercise, videoLessons } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sprint")({
  head: () => ({
    meta: [
      { title: "Sprint Workspace — Syntax" },
      { name: "description", content: "Learning materials, short video lessons, contextualised exercises and professional assignments for your current sprint." },
      { property: "og:title", content: "Sprint Workspace — Syntax" },
      { property: "og:description", content: "Materials, video lessons, exercises and assignments built around real developer communication." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SprintWorkspace,
});

const tabClass =
  "rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-0 text-sm text-muted-foreground shadow-none data-[state=active]:border-comm data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";

function SprintWorkspace() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={`${currentSprint.code} · ${currentSprint.start} — ${currentSprint.end}`}
        title={currentSprint.title}
        description={currentSprint.scenario}
        actions={
          <div className="w-56">
            <div className="flex justify-between font-mono text-xs text-muted-foreground">
              <span>Sprint progress</span>
              <span className="text-comm">{currentSprint.progress}%</span>
            </div>
            <Meter value={currentSprint.progress} className="mt-2" label="Sprint progress" />
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {currentSprint.outcomes.map((o, i) => (
          <div key={o} className="flex gap-3 border-l-2 border-comm/40 py-1 pl-4">
            <span className="font-mono text-xs text-comm">0{i + 1}</span>
            <p className="text-sm text-foreground">{o}</p>
          </div>
        ))}
      </section>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="mb-8 h-auto w-full justify-start gap-6 overflow-x-auto rounded-none border-b border-hairline bg-transparent p-0">
          <TabsTrigger value="videos" className={tabClass}>Video lessons</TabsTrigger>
          <TabsTrigger value="exercises" className={tabClass}>Exercises</TabsTrigger>
          <TabsTrigger value="assignments" className={tabClass}>Assignments</TabsTrigger>
          <TabsTrigger value="materials" className={tabClass}>Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="videos"><Videos /></TabsContent>
        <TabsContent value="exercises"><Exercises /></TabsContent>
        <TabsContent value="assignments"><Assignments /></TabsContent>
        <TabsContent value="materials"><Materials /></TabsContent>
      </Tabs>
    </div>
  );
}

function Videos() {
  const [selectedId, setSelectedId] = useState(videoLessons[0]!.id);
  const [playing, setPlaying] = useState(false);
  const lesson = videoLessons.find((v) => v.id === selectedId) ?? videoLessons[0]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <div className="bg-lesson relative aspect-video overflow-hidden rounded-xl border border-hairline">
          <div className="bg-grid absolute inset-0" aria-hidden />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <Tag tone="comm">Lesson · {lesson.duration}</Tag>
              <span className="font-mono text-xs text-muted-foreground">{lesson.speaker}</span>
            </div>
            <pre className="hidden self-start rounded-lg border border-hairline bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground backdrop-blur sm:block">
{`// review comment
- "Split this function."
+ "suggestion: Could we extract
+  validation into a helper?"`}
            </pre>
            <div className="flex items-end justify-between gap-4">
              <h3 className="max-w-md text-xl font-semibold text-foreground md:text-2xl">{lesson.title}</h3>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                aria-label={playing ? "Pause lesson" : "Play lesson"}
              >
                {playing ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
              </button>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary">
            <div className={cn("h-full bg-comm transition-all duration-1000", playing ? "w-1/3" : lesson.watched ? "w-full" : "w-0")} />
          </div>
        </div>
        <div className="mt-6">
          <p className="eyebrow">Chapters</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {lesson.chapters.map((c, i) => (
              <li key={c} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <SectionTitle title="Sprint lessons" aside={<span className="font-mono text-xs text-muted-foreground">{videoLessons.length} short videos</span>} />
        <ul className="space-y-1">
          {videoLessons.map((v) => (
            <li key={v.id}>
              <button
                onClick={() => {
                  setSelectedId(v.id);
                  setPlaying(false);
                }}
                aria-pressed={v.id === selectedId}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                  v.id === selectedId ? "bg-surface-raised" : "hover:bg-surface",
                )}
              >
                <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border", v.watched ? "border-positive/40 text-positive" : "border-hairline text-muted-foreground")}>
                  {v.watched ? <Check className="size-3" /> : <Play className="size-3" />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-foreground">{v.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {v.speaker} · {v.duration}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Exercises() {
  const [choice, setChoice] = useState<string | null>(null);
  const [rewrite, setRewrite] = useState("");
  const [showModel, setShowModel] = useState(false);
  const selected = choiceExercise.options.find((o) => o.id === choice);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section aria-labelledby="ex1">
        <p className="eyebrow">Exercise 1 · Choose the best phrasing</p>
        <div className="mt-4 rounded-xl border border-hairline bg-surface p-5">
          <p className="eyebrow">Context</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{choiceExercise.context}</p>
        </div>
        <h3 id="ex1" className="mt-6 text-lg font-medium text-foreground">{choiceExercise.question}</h3>
        <div className="mt-4 space-y-2" role="radiogroup" aria-labelledby="ex1">
          {choiceExercise.options.map((o) => {
            const isSel = choice === o.id;
            return (
              <button
                key={o.id}
                role="radio"
                aria-checked={isSel}
                onClick={() => setChoice(o.id)}
                className={cn(
                  "flex w-full gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  isSel ? (o.correct ? "border-positive/50 bg-positive/10" : "border-attention/50 bg-attention/10") : "border-hairline hover:border-muted-foreground/40",
                )}
              >
                <span className="font-mono text-xs uppercase text-muted-foreground">{o.id}</span>
                <span className="font-mono text-[13px] leading-relaxed text-foreground">{o.text}</span>
              </button>
            );
          })}
        </div>
        {selected ? (
          <p className={cn("animate-rise mt-4 border-l-2 pl-4 text-sm leading-relaxed", selected.correct ? "border-positive text-positive" : "border-attention text-attention")} aria-live="polite">
            {selected.feedback}
          </p>
        ) : null}
      </section>

      <section aria-labelledby="ex2">
        <p className="eyebrow">Exercise 2 · Rewrite for clarity and tone</p>
        <h3 id="ex2" className="mt-4 text-lg font-medium text-foreground">{rewriteExercise.context}</h3>
        <blockquote className="mt-4 rounded-lg border border-attention/30 bg-attention/10 px-4 py-3 font-mono text-[13px] text-foreground">
          {rewriteExercise.original}
        </blockquote>
        <label htmlFor="rewrite" className="mt-6 block text-sm text-muted-foreground">
          Your rewrite
        </label>
        <Textarea
          id="rewrite"
          value={rewrite}
          onChange={(e) => setRewrite(e.target.value)}
          placeholder="Label your intent, explain the reason and suggest an alternative…"
          className="mt-2 min-h-32 border-hairline bg-surface font-mono text-[13px]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (!rewrite.trim()) {
                toast("Write your version first", { description: "Then compare it with the model answer." });
                return;
              }
              toast.success("Saved for tutor review", { description: "Daniel will comment before Friday's sprint review." });
            }}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Send className="size-4" /> Save for review
          </button>
          <button onClick={() => setShowModel((s) => !s)} className="inline-flex h-9 items-center rounded-lg border border-hairline px-4 text-sm text-foreground hover:border-comm/40">
            {showModel ? "Hide model answer" : "Compare with model answer"}
          </button>
        </div>
        {showModel ? (
          <div className="animate-rise mt-5 rounded-lg border border-positive/30 bg-positive/10 px-4 py-3">
            <p className="eyebrow">Model answer</p>
            <p className="mt-2 font-mono text-[13px] leading-relaxed text-foreground">{rewriteExercise.modelAnswer}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

const statusTone = { "Not started": "neutral", Submitted: "comm", Reviewed: "positive" } as const;

function Assignments() {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline">
      <div className="hidden grid-cols-[2fr_1fr_0.6fr_0.8fr_auto] gap-4 border-b border-hairline bg-surface px-5 py-3 md:grid">
        {["Assignment", "Deliverable", "Due", "Status", ""].map((h) => (
          <span key={h} className="eyebrow">{h}</span>
        ))}
      </div>
      <ul className="divide-y divide-hairline">
        {assignments.map((a) => (
          <li key={a.id} className="grid gap-2 px-5 py-4 md:grid-cols-[2fr_1fr_0.6fr_0.8fr_auto] md:items-center md:gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">Reviewed by {a.reviewer}</p>
            </div>
            <span className="text-sm text-muted-foreground">{a.deliverable}</span>
            <span className="font-mono text-xs text-muted-foreground">{a.due}</span>
            <span><Tag tone={statusTone[a.status as keyof typeof statusTone]}>{a.status}</Tag></span>
            <button
              onClick={() => toast(a.status === "Not started" ? "Assignment opened" : "Opening your submission", { description: a.title })}
              className="justify-self-start text-sm text-comm hover:underline md:justify-self-end"
            >
              {a.status === "Not started" ? "Start" : "View"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Materials() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {materials.map((m) => {
        const open = openId === m.id;
        return (
          <li key={m.id}>
            <button
              onClick={() => setOpenId(open ? null : m.id)}
              aria-expanded={open}
              className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 py-5 text-left md:grid-cols-[160px_1fr_auto]"
            >
              <span className="hidden md:block"><Tag>{m.type}</Tag></span>
              <BookOpen className="mt-0.5 size-4 text-muted-foreground md:hidden" aria-hidden />
              <span>
                <span className="block text-foreground">{m.title}</span>
                <span className={cn("block overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all", open ? "mt-2 max-h-40" : "max-h-0")}>{m.summary}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground">{m.read}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
