import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ThemeToggle } from "@/components/syntax/theme";
import { LEVELS } from "@/data/platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "dCoder — Inglés técnico para developers" },
      { name: "description", content: "Entrena la comunicación técnica que tu carrera ya te está pidiendo: sprints semanales, práctica escrita y oral, y feedback 1:1." },
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

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="dCoder, inicio">
      <span className="grid size-8 place-items-center rounded-lg border border-comm/40 bg-comm-soft font-mono text-sm font-semibold text-comm" aria-hidden>
        {"</>"}
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">dCoder</span>
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
              dCoder entrena la comunicación técnica que se usa en equipos reales: code reviews, decisiones de arquitectura y entrevistas. Sin exámenes A1–C2 y sin convertir el aprendizaje en un videojuego.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Inscríbete <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href="#programa" className="inline-flex h-11 items-center gap-2 text-sm text-foreground transition-colors hover:text-comm">
                Conoce el programa <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Sprints semanales", "Práctica escrita y oral", "Feedback 1:1"].map((item) => (
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
              Nació de una traductora y de developers cansados de lo mismo.
            </h2>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Isis es traductora. Acompañando a profesionales que aprenden inglés vio el patrón: la gente no abandona por falta de contenido, abandona porque el contenido no se parece a su trabajo.
              </p>
              <p>
                Del otro lado, los equipos de desarrollo viven otra realidad: saben programar, pero explicar una decisión técnica en inglés sigue frenando su carrera. dCoder junta esas dos miradas en un método semanal.
              </p>
              <p className="border-l-2 border-comm pl-4 font-display text-xl leading-snug text-foreground">
                No enseñamos inglés. Entrenamos la comunicación de tu trabajo.
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
                Un developer no necesita aprobar un examen para trabajar en inglés: necesita explicar, discutir y decidir. Por eso medimos tu avance en niveles de carrera —Entry level a Senior— y no en letras que no significan nada en una entrevista.
              </p>
            </div>

            <dl className="mt-14 grid gap-8 border-t border-hairline pt-10 md:grid-cols-3">
              {[
                { title: "Inglés de trabajo, no de examen", text: "Practicas lo que usarás el lunes: stand-ups, pull requests, incidentes y entrevistas." },
                { title: "Niveles de carrera, no letras", text: "Entry level, Junior, Mid y Senior. Sabes qué significa cada nivel y qué te falta para el siguiente." },
                { title: "Práctica con intención, no recompensas", text: "Escribes, explicas y recibes feedback. Sin puntos, rachas ni ruido." },
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
                Un sprint por semana. Cinco días. Un objetivo claro.
              </h2>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-comm hover:underline">
                Así se ve por dentro <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

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
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Defines el objetivo y el vocabulario que vas a necesitar durante la semana.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-tech">Martes a jueves · Práctica</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Learning Pad, code reviews, ejercicios de entrevista y flashcards con repetición espaciada.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-lang">Viernes · Sprint review</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Revisión 1:1 con tu tutor, feedback y retrospectiva. El lunes empieza el siguiente sprint.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Carrera */}
        <section id="carrera" className="scroll-mt-20 border-t border-hairline">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-5xl">Diferénciate en el mundo laboral.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                El inglés deja de ser un requisito que cumples a medias y pasa a ser una ventaja que se nota en cómo trabajas.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Explicas decisiones técnicas sin perder precisión.",
                  "Escribes code reviews con tono, evidencia y alternativas.",
                  "Llegas a entrevistas en inglés con estructura, no con frases memorizadas.",
                  "Negocias alcance y plazos con stakeholders.",
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
                Tu nivel de inglés se mide por separado de tu seniority técnica. Un Mid en frontend puede estar en Junior de comunicación, y eso no es un retroceso: es información para saber qué practicar.
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
                Inscríbete, crea tu cuenta y haz el sprint de prueba. Sin tarjeta y sin exámenes de nivel.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Inscríbete <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link to="/dashboard" className="inline-flex h-11 items-center rounded-lg border border-hairline bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-comm/40">
                  Explorar la demo
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">La demo abre el dashboard con datos de ejemplo. No necesitas registro.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <Brand />
            <p className="mt-2 text-xs text-muted-foreground">Inglés técnico para developers.</p>
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
