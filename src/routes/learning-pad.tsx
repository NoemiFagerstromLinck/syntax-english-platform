import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { flashcards, learningPad } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learning-pad")({
  head: () => ({
    meta: [
      { title: "Learning Pad — dCoder" },
      { name: "description", content: "Explain real code in English and review technical concepts with active recall and spaced repetition." },
      { property: "og:title", content: "Learning Pad — dCoder" },
      { property: "og:description", content: "Written explanation practice and spaced-repetition flashcards for technical English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningPad,
});

function LearningPad() {
  return (
    <div className="space-y-8">
      <header className="animate-rise max-w-2xl">
        <h1 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">Learning Pad</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          You already know how to code. Here you practise explaining it in English, then lock the concepts in with recall.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.12fr_1fr]">
        <PadCard />
        <RecallDeck />
      </div>
    </div>
  );
}

function PadCard() {
  const [answer, setAnswer] = useState("");
  const [showReference, setShowReference] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(learningPad.code);
      toast.success("Code copied");
    } catch {
      toast("Could not copy the code");
    }
  };

  const save = () => {
    if (!answer.trim()) {
      toast("Write your explanation first", { description: "One or two sentences are enough to start." });
      return;
    }
    toast.success("Answer saved", { description: "Your tutor will review it in the sprint review." });
  };

  return (
    <section className="animate-rise panel flex flex-col overflow-hidden" aria-labelledby="pad-title">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{learningPad.label}</span>
        <button
          type="button"
          onClick={copyCode}
          aria-label="Copy code"
          className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
        >
          <Copy className="size-3.5" aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <pre className="overflow-x-auto rounded-lg border border-hairline bg-background p-4 font-mono text-[13px] leading-relaxed text-foreground">
          <code>{learningPad.code}</code>
        </pre>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{learningPad.intro}</p>

        <h2 id="pad-title" className="mt-5 text-lg font-medium text-foreground">Explain your implementation</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{learningPad.question}</p>

        <label htmlFor="pad-answer" className="sr-only">Your explanation</label>
        <Textarea
          id="pad-answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={learningPad.placeholder}
          className="mt-3 min-h-32 border-hairline bg-surface font-mono text-[13px]"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={save}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save answer
          </button>
          <button
            type="button"
            onClick={() => setShowReference((value) => !value)}
            aria-expanded={showReference}
            className="inline-flex h-9 items-center rounded-lg border border-hairline px-4 text-sm text-foreground transition-colors hover:border-comm/40"
          >
            {showReference ? "Hide reference answer" : "Show reference answer"}
          </button>
        </div>

        {showReference ? (
          <div className="animate-rise mt-4 rounded-lg border border-comm/30 bg-comm-soft px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-comm">Reference answer</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{learningPad.reference}</p>
          </div>
        ) : null}

        <p className="mt-auto pt-6 text-xs text-muted-foreground">{learningPad.note}</p>
      </div>
    </section>
  );
}

const dimensions = ["conceptual", "contextual", "productive"] as const;
const dimensionLabels: Record<(typeof dimensions)[number], string> = {
  conceptual: "Conceptual · what it means",
  contextual: "Contextual · when it is used",
  productive: "Productive · how you say it",
};

function RecallDeck() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratings, setRatings] = useState<Record<string, "again" | "got">>({});
  const card = flashcards[index]!;
  const last = index === flashcards.length - 1;
  const rated = Object.keys(ratings).length;

  const go = (delta: number) => {
    setIndex((current) => Math.min(flashcards.length - 1, Math.max(0, current + delta)));
    setRevealed(false);
  };

  const rate = (value: "again" | "got") => {
    setRatings((current) => ({ ...current, [card.term]: value }));
    setRevealed(false);
    if (last) {
      toast.success("Deck finished", { description: `${rated + 1} of ${flashcards.length} concepts rated today.` });
    } else {
      setIndex((current) => current + 1);
    }
  };

  return (
    <section className="animate-rise panel flex flex-col p-5 md:p-6" aria-labelledby="recall-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="recall-title" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Recall · Technical concepts
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {index + 1} / {flashcards.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        aria-expanded={revealed}
        className="mt-4 block w-full rounded-xl border border-hairline bg-surface-raised/40 px-5 py-7 text-left transition-colors hover:border-comm/30"
      >
        {revealed ? (
          <span className="block min-h-[190px]">
            <span className="block font-display text-xl font-semibold text-foreground">{card.term}</span>
            {dimensions.map((dimension) => (
              <span key={dimension} className="mt-4 block">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{dimensionLabels[dimension]}</span>
                <span className="mt-1 block text-sm leading-relaxed text-foreground">{card[dimension]}</span>
              </span>
            ))}
          </span>
        ) : (
          <span className="flex min-h-[190px] flex-col items-center justify-center text-center">
            <span className="text-sm text-muted-foreground">Can you explain this concept?</span>
            <span className="mt-3 font-display text-3xl font-semibold text-foreground">{card.term}</span>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-wider text-comm">Tap to reveal</span>
          </span>
        )}
      </button>

      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-lang">Interview application</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">{card.interview}</p>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Today&rsquo;s deck</span>
          <span className="font-mono">{rated}/{flashcards.length}</span>
        </div>
        <div className="mt-2 flex gap-1.5" aria-hidden>
          {flashcards.map((item, itemIndex) => (
            <span
              key={item.term}
              title={item.term}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                ratings[item.term] === "got" ? "bg-positive" : ratings[item.term] === "again" ? "bg-attention" : itemIndex === index ? "bg-comm" : "bg-secondary",
              )}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hairline px-3 text-sm text-foreground transition-colors hover:border-comm/40 disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> Previous
          </button>

          {revealed ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => rate("again")}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hairline px-3 text-sm text-foreground transition-colors hover:border-attention/50"
              >
                <RotateCcw className="size-3.5" aria-hidden /> Again
              </button>
              <button
                type="button"
                onClick={() => rate("got")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
                )}
              >
                <Check className="size-3.5" aria-hidden /> Got it
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => go(1)}
              disabled={last}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Next <ArrowRight className="size-3.5" aria-hidden />
            </button>
          )}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          {rated} of {flashcards.length} rated today · Again reviews tomorrow, Got it reviews in 5 days.
        </p>
      </div>
    </section>
  );
}
