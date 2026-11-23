import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ThemeToggle } from "@/components/syntax/theme";
import { Logo } from "@/components/syntax/logo";
import { LEVELS } from "@/data/platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "dCoder — Inglés técnico para developers" },
      { name: "description", content: "dCoder entrena el inglés real de tu trabajo: sprints de 5 días, práctica escrita y oral, y feedback 1:1." },
      { property: "og:title", content: "dCoder — Inglés técnico para developers" },
      { property: "og:description", content: "Tu inglés técnico, al nivel de tu código." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const navLinks = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#vision", label: "Visión" },
  { href: "#programa", label: "Programa" },
  { href: "#carrera", label: "Carrera" },
];

const week = [
  { day: "Lun", label: "Planning", state: "done" },
  { day: "Mar", label: "Technical", state: "done" },
  { day: "Mié", label: "Practice", state: "current" },
  { day: "Jue", label: "Interview", state: "todo" },
  { day: "Vie", label: "Review", state: "todo" },
];

function Brand({ full = false }: { full?: boolean }) {
  return (
    <Link to="/" className="flex items-center" aria-label="dCoder, inicio">
      <Logo variant={full ? "full" : "header"} className={full ? "h-14" : "h-9"} />
    </Link>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-hairline bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-10">
          <Brand />
          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/dashboard" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
              Ya tengo cuenta
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Inscríbete
            </Link>
          </div>
        </div>
      </header>

      <main id="contenido">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="animate-rise">
            <h1 className="text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
              El inglés que tu <span className="text-comm">carrera</span> ya te está pidiendo.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              dCoder entrena el inglés real de tu trabajo: defender una decisión técnica, dejar un buen comentario en un PR, pasar una entrevista sin quedarte en blanco. Cinco días a la semana, con un objetivo concreto y feedback de verdad.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Empieza tu sprint <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href="#programa" className="inline-flex h-11 items-center gap-2 text-sm text-foreground transition-colors hover:text-comm">
                Ver cómo funciona <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Sprints de 5 días", "Práctica escrita y oral", "Feedback 1:1"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-positive" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="mb-3 ml-1 inline-flex -rotate-2 flex-col rounded-lg border border-hairline bg-surface px-3 py-2 shadow-panel">
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Recall · 1/4</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">Scalability</p>
            </div>

            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Learning pad · JavaScript</span>
                <span className="size-1.5 rounded-full bg-comm" aria-hidden />
              </div>
              <div className="p-4 md:p-5">
                <pre className="overflow-x-auto rounded-lg border border-hairline bg-background p-3 font-mono text-[11px] leading-relaxed text-foreground">
{`const activeUsers = users.filter(
  user => user.isActive
);`}
                </pre>
                <p className="mt-4 text-sm font-medium text-foreground">Explain your implementation</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">What does this code do, and why would you use filter instead of map?</p>
                <div className="mt-3 rounded-lg border border-hairline bg-surface px-3 py-2.5 font-mono text-[11px] text-muted-foreground">
                  This code creates a new array…
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">Save answer</span>
                  <span className="rounded-md border border-hairline px-2.5 py-1 text-[11px] text-muted-foreground">Reference answer</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-1 hidden rounded-xl border border-comm/30 bg-comm-soft px-4 py-3 shadow-panel sm:block">
              <p className="font-mono text-[9px] uppercase tracking-wider text-comm">Sprint 07 · Day 3</p>
              <p className="mt-1 text-sm font-medium text-foreground">Communication practice</p>
              <div className="mt-2 flex gap-1" aria-hidden>
                {week.map((item) => (
                  <span
                    key={item.day}
                    className={
                      item.state === "done"
                        ? "h-1 w-6 rounded-full bg-positive"
                        : item.state === "current"
                          ? "h-1 w-6 rounded-full bg-comm"
                          : "h-1 w-6 rounded-full bg-secondary"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes somos */}
        <section id="quienes-somos" className="scroll-mt-20 border-t border-hairline">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[0.95fr_1.05fr]">
            <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
              El inglés no debería ser el filtro que deja fuera a buenos developers.
            </h2>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Hay un momento que se repite: tienes la respuesta, sabes explicarla en tu idioma y aun así te quedas en silencio en la reunión. No falta conocimiento; falta haberlo practicado en el contexto donde importa.
              </p>
              <p>
                dCoder existe para cerrar esa brecha. Lleva el inglés al terreno real del desarrollo, con retos que se parecen a tu día a día y feedback que puedes aplicar al día siguiente.
              </p>
              <p className="border-l-2 border-comm pl-4 font-display text-xl leading-snug text-foreground">
                Tu inglés no necesita ser perfecto. Necesita servirte.
              </p>
            </div>
          </div>
        </section>

        {/* Visión */}
        <section id="vision" className="scroll-mt-20 border-t border-hairline">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
                Que el idioma deje de ser el techo de tu carrera.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                El objetivo es simple: que llegues a una reunión, a un pull request o a una entrevista y puedas ser tú. Claro, directo, con criterio. No un alumno recitando reglas.
              </p>
            </div>

            <dl className="mt-14 grid gap-8 border-t border-hairline pt-10 md:grid-cols-3">
              {[
                { title: "Se practica en el trabajo, no en el vacío", text: "Cada ejercicio nace de una situación real: un comentario en un PR, un incidente en producción, una entrevista técnica." },
                { title: "Avanzas en niveles que entiendes", text: "Entry level, Junior, Mid y Senior. Los mismos nombres que usas para tu carrera, aplicados a cómo te comunicas." },
                { title: "Feedback que puedes usar mañana", text: "Tu tutor te dice qué cambiar y cómo decirlo mejor. Nada de puntajes que no significan nada." },
              ].map((item) => (
                <div key={item.title}>
                  <dt className="font-display text-lg font-semibold text-foreground">{item.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Programa */}
        <section id="programa" className="scroll-mt-20 border-t border-hairline">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
                Cinco días. Un objetivo. Un cambio que se nota.
              </h2>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-comm hover:underline">
                Así se ve por dentro <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Cada sprint entrena una situación concreta de tu trabajo. El lunes entiendes el reto, durante la semana lo practicas y el viernes lo defiendes.
            </p>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-5">
              {week.map((item) => (
                <li key={item.day} className="bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.day}</span>
                    {item.state === "done" ? <Check className="size-3.5 text-positive" aria-label="Completado" /> : null}
                    {item.state === "current" ? <span className="size-2 rounded-full bg-comm" aria-label="Hoy" /> : null}
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.state === "done" ? "Listo" : item.state === "current" ? "En curso" : "Próximo"}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-comm">Lunes · Sprint planning</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Eliges el reto de la semana: por ejemplo, dar feedback en un code review sin sonar a ataque.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-tech">Martes a jueves · Práctica guiada</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Escribes, explicas y te equivocas en un espacio seguro. Learning Pad, flashcards y simulaciones reales.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-lang">Viernes · Sprint review</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Lo presentas, recibes feedback 1:1 y sales con el siguiente paso claro. El lunes arrancas otro reto.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Carrera */}
        <section id="carrera" className="scroll-mt-20 border-t border-hairline">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-5xl">Tu inglés se convierte en ventaja.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                No se trata de sonar como nativo. Se trata de que tu criterio técnico se entienda, se respete y se recuerde.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Explicas decisiones técnicas sin perder precisión.",
                  "Dejas comentarios en un PR que se entienden a la primera.",
                  "Llegas a entrevistas con una estructura clara, no con frases memorizadas.",
                  "Negocias alcance y plazos sin que el idioma te ponga en desventaja.",
                ].map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-positive" aria-hidden /> {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-6 md:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Tu inglés, en niveles de carrera</p>
                <span className="font-mono text-[11px] text-muted-foreground">Demo</span>
              </div>
              <div className="mt-7 grid grid-cols-4 gap-1.5">
                {LEVELS.map((level, index) => (
                  <div key={level}>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={index < 1 ? "h-full rounded-full bg-positive" : index === 1 ? "h-full rounded-full bg-comm" : "h-0"}
                        style={{ width: index === 1 ? "64%" : "100%" }}
                      />
                    </div>
                    <p className={index <= 1 ? "mt-2 text-[11px] leading-tight text-foreground" : "mt-2 text-[11px] leading-tight text-muted-foreground"}>{level}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-muted-foreground">
                Tu nivel de inglés se mide por separado de tu seniority técnica. Un Mid en frontend puede estar en Junior de comunicación, y eso no es un retroceso: te dice exactamente qué practicar para tu próximo salto.
              </p>
              <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 text-sm text-comm hover:underline">
                Ver un perfil de ejemplo <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-hairline">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-24">
            <div className="rounded-2xl border border-comm/30 bg-comm-soft px-6 py-12 md:px-12 md:py-16">
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">Tu próximo sprint empieza el lunes.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Inscríbete y haz tu primer sprint con datos de ejemplo. En cinco días sabrás exactamente cuál es tu siguiente paso, y tendrás las palabras para darlo.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Inscríbete <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link to="/dashboard" className="inline-flex h-11 items-center rounded-lg border border-hairline bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-comm/40">
                  Probar la demo
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Sin tarjeta. Entras directo a la demo con datos de ejemplo.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <Brand full />
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
            <Link to="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Entrar
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 dCoder</p>
        </div>
      </footer>
    </div>
  );
}
