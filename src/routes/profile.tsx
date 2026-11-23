import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, Clock, Languages, Pencil } from "lucide-react";
import { Meter, PageHeader, SectionTitle, Tag } from "@/components/syntax/primitives";
import { LEVELS, student } from "@/data/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — dCoder" },
      { name: "description", content: "Technical background, professional objectives and English proficiency, kept as separate dimensions." },
      { property: "og:title", content: "Student Profile — dCoder" },
      { property: "og:description", content: "Your technical background, career objectives and English proficiency in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const SENIORITY = ["Entry level", "Junior", "Mid", "Senior", "Staff+"];

function Scale({ steps, current, tone }: { steps: string[]; current: string; tone: "tech" | "lang" | "comm" }) {
  const idx = steps.indexOf(current);
  const fill = { tech: "bg-tech", lang: "bg-lang", comm: "bg-comm" }[tone];
  const text = { tech: "text-tech", lang: "text-lang", comm: "text-comm" }[tone];
  return (
    <div>
      <div className="flex gap-1">
        {steps.map((s, i) => (
          <span key={s} className={cn("h-1.5 flex-1 rounded-full", i <= idx ? fill : "bg-secondary")} />
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-1 font-mono text-[9px] leading-none text-muted-foreground">
        {steps.map((s) => (
          <span key={s} className={cn("truncate", s === current && text)}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const edit = () => toast("Editing is not available in this prototype", { description: "Profile changes will be saved once accounts are enabled." });
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Student profile"
        title={
          <span className="flex items-center gap-5">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl border border-hairline bg-surface-raised font-mono text-lg text-foreground">{student.initials}</span>
            <span>
              {student.name}
              <span className="mt-1 block font-sans text-base font-normal text-muted-foreground">
                {student.role} · {student.company}
              </span>
            </span>
          </span>
        }
        actions={
          <button onClick={edit} className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline px-4 text-sm text-foreground hover:border-comm/40">
            <Pencil className="size-4" /> Edit profile
          </button>
        }
      />

      <div className="-mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2"><MapPin className="size-4" aria-hidden /> {student.location}</span>
        <span className="inline-flex items-center gap-2"><Clock className="size-4" aria-hidden /> {student.timezone}</span>
        <span className="inline-flex items-center gap-2"><Languages className="size-4" aria-hidden /> Native: {student.nativeLanguage}</span>
        <span>Member since {student.memberSince}</span>
      </div>

      {/* Three separate axes */}
      <section className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:grid-cols-3">
        <div className="bg-surface p-6">
          <p className="eyebrow text-tech">Technical seniority</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">{student.technical.seniority}</p>
          <p className="mt-1 text-sm text-muted-foreground">{student.technical.years} years · frontend engineering</p>
          <div className="mt-6"><Scale steps={SENIORITY} current={student.technical.seniority} tone="tech" /></div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">Your engineering experience and scope of responsibility. Self-reported and confirmed with your tutor.</p>
        </div>
        <div className="bg-surface p-6">
          <p className="eyebrow text-lang">English proficiency</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">{student.english.level}</p>
          <p className="mt-1 text-sm text-muted-foreground">{student.english.label} · assessed {student.english.lastAssessed}</p>
          <div className="mt-6"><Scale steps={[...LEVELS]} current={student.english.level} tone="lang" /></div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">General English ability, mapped to the same ladder as your technical career instead of exam grades.</p>
        </div>
        <div className="bg-surface p-6">
          <p className="eyebrow text-comm">Communication competency</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">{student.communication.current}</p>
          <p className="mt-1 text-sm text-muted-foreground">{student.communication.progressToNext}% toward {student.communication.target}</p>
          <div className="mt-6"><Scale steps={[...LEVELS]} current={student.communication.current} tone="comm" /></div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">How effectively you use English in real engineering situations, assessed at each sprint review.</p>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <SectionTitle index="01" title="Technical background" />
          <div className="space-y-5">
            <div>
              <p className="eyebrow">Primary stack</p>
              <div className="mt-2 flex flex-wrap gap-2">{student.technical.primaryStack.map((s) => <Tag key={s} tone="tech">{s}</Tag>)}</div>
            </div>
            <div>
              <p className="eyebrow">Also works with</p>
              <div className="mt-2 flex flex-wrap gap-2">{student.technical.secondaryStack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
            <div>
              <p className="eyebrow">Domains</p>
              <div className="mt-2 flex flex-wrap gap-2">{student.technical.domains.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          </div>
          <ol className="mt-8 space-y-5 border-l border-hairline pl-5">
            {student.technical.history.map((h) => (
              <li key={h.period}>
                <p className="font-mono text-xs text-muted-foreground">{h.period}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{h.title} · {h.org}</p>
                <p className="text-sm text-muted-foreground">{h.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle index="02" title="English proficiency by skill" />
          <dl className="space-y-4">
            {student.english.skills.map((s) => (
              <div key={s.skill}>
                <div className="flex justify-between text-sm">
                  <dt className="text-foreground">{s.skill}</dt>
                  <dd className="font-mono text-xs text-lang">{s.level}</dd>
                </div>
                <Meter value={s.value} tone="lang" className="mt-2" label={`${s.skill} ${s.level}`} />
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">Productive skills (speaking, writing) are the current development priority.</p>

          <div className="mt-10">
            <SectionTitle index="03" title="Professional objectives" />
            <p className="font-display text-xl leading-snug text-foreground">{student.objectives.targetRole}</p>
            <p className="mt-2 font-mono text-xs text-comm">{student.objectives.horizon}</p>
            <p className="eyebrow mt-6">Priority contexts</p>
            <ul className="mt-2 space-y-1.5">
              {student.objectives.contexts.map((c) => (
                <li key={c} className="text-sm text-foreground before:mr-2 before:text-comm before:content-['→']">{c}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section>
        <SectionTitle index="04" title="Learning preferences" aside={<button onClick={edit} className="text-xs text-comm hover:underline">Edit</button>} />
        <dl className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Session slot", student.preferences.sessionSlot],
            ["Primary tutor", student.preferences.tutor],
            ["Accent exposure", student.preferences.accent],
            ["Feedback style", student.preferences.feedbackStyle],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-5 py-4">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
