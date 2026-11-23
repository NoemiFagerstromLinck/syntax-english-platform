import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { appFaq, publicFaq, type FaqItem } from "@/data/faq";
import { student } from "@/data/platform";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
  link?: FaqItem["link"];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findFaq(text: string, items: FaqItem[]) {
  const query = normalize(text);
  let best: { item: FaqItem; score: number } | null = null;

  for (const item of items) {
    let score = 0;
    if (query.includes(normalize(item.question))) score += 3;
    for (const keyword of item.keywords) {
      const value = normalize(keyword);
      if (query.includes(value)) score += value.includes(" ") ? 2 : 1;
    }
    if (score > (best?.score ?? 0)) best = { item, score };
  }

  return best && best.score > 0 ? best.item : null;
}

function BeeAvatar({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  const base = import.meta.env.BASE_URL;
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full bg-comm-soft", className)}>
      <img src={`${base}brand/dcoder-mark.png`} alt="" className={cn("hidden w-auto dark:block", imageClassName)} />
      <img src={`${base}brand/dcoder-mark-paper.png`} alt="" className={cn("block w-auto dark:hidden", imageClassName)} />
    </span>
  );
}

function introMessage(variant: "public" | "app"): ChatMessage {
  if (variant === "app") {
    return {
      id: 0,
      role: "bot",
      text: `Hola, ${student.name.split(" ")[0]}. Puedo ayudarte con el sprint, el Learning Pad, tus sesiones o tu progreso. Elige una pregunta o escribe la tuya.`,
    };
  }
  return {
    id: 0,
    role: "bot",
    text: "Hola. Te ayudo con dudas sobre el programa, los sprints o la inscripción. Elige una pregunta o escribe la tuya.",
  };
}

export function FaqChat({ variant }: { variant: "public" | "app" }) {
  const faqs = variant === "app" ? appFaq : publicFaq;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [introMessage(variant)]);
  const [asked, setAsked] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const counter = useRef(0);
  const timer = useRef<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = faqs.filter((item) => !asked.includes(item.id));
  const suggestions = showAll ? remaining : remaining.slice(0, 4);
  const done = remaining.length === 0;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("chat") === "1") setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const reply = (text: string, link?: FaqItem["link"]) => {
    setTyping(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { id: ++counter.current, role: "bot", text, link }]);
      setTyping(false);
    }, 420);
  };

  const askItem = (item: FaqItem) => {
    if (typing) return;
    setMessages((current) => [...current, { id: ++counter.current, role: "user", text: item.question }]);
    setAsked((current) => (current.includes(item.id) ? current : [...current, item.id]));
    reply(item.answer, item.link);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;

    setInput("");
    setMessages((current) => [...current, { id: ++counter.current, role: "user", text }]);

    const found = findFaq(text, faqs);
    if (found) {
      setAsked((current) => (current.includes(found.id) ? current : [...current, found.id]));
      reply(found.answer, found.link);
    } else {
      reply("Todavía no tengo una respuesta para eso. Prueba con una de las preguntas de abajo o reformula tu duda.");
    }
  };

  const reset = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setMessages([introMessage(variant)]);
    setAsked([]);
    setInput("");
    setTyping(false);
    setShowAll(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <section
          role="dialog"
          aria-label="Preguntas frecuentes de dCoder"
          className="animate-rise flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]"
        >
          <header className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <BeeAvatar className="size-9" imageClassName="h-5" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">Asistente dCoder</p>
              <p className="text-[11px] text-muted-foreground">Preguntas frecuentes</p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Reiniciar conversación"
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              <RotateCcw className="size-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <div className="flex max-h-[min(420px,45vh)] flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm leading-relaxed text-primary-foreground">
                  {message.text}
                </div>
              ) : (
                <div key={message.id} className="flex items-start gap-2">
                  <BeeAvatar className="mt-0.5 size-6" imageClassName="h-3.5" />
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-raised px-3.5 py-2 text-sm leading-relaxed text-foreground">
                    {message.text}
                    {message.link ? (
                      "to" in message.link ? (
                        <Link
                          to={message.link.to}
                          onClick={() => setOpen(false)}
                          className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-comm hover:underline"
                        >
                          {message.link.label} <ArrowRight className="size-3" aria-hidden />
                        </Link>
                      ) : (
                        <a
                          href={message.link.href}
                          onClick={() => setOpen(false)}
                          className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-comm hover:underline"
                        >
                          {message.link.label} <ArrowRight className="size-3" aria-hidden />
                        </a>
                      )
                    ) : null}
                  </div>
                </div>
              ),
            )}
            {typing ? (
              <div className="flex items-start gap-2">
                <BeeAvatar className="mt-0.5 size-6" imageClassName="h-3.5" />
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-surface-raised px-3.5 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
                      style={{ animationDelay: `${dot * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-hairline px-4 py-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {done ? "Ya viste todas las preguntas" : "Preguntas sugeridas"}
            </p>
            <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => askItem(item)}
                  disabled={typing}
                  className="rounded-lg border border-hairline px-2.5 py-1.5 text-left text-xs leading-snug text-foreground transition-colors hover:border-comm/40 hover:text-comm disabled:opacity-50"
                >
                  {item.question}
                </button>
              ))}
              {!showAll && remaining.length > 4 ? (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Ver todas
                </button>
              ) : null}
              {done ? (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-comm hover:underline"
                >
                  Empezar de nuevo
                </button>
              ) : null}
            </div>

            <form onSubmit={submit} className="mt-3 flex items-center gap-2">
              <label htmlFor={`faq-input-${variant}`} className="sr-only">Escribe tu pregunta</label>
              <input
                id={`faq-input-${variant}`}
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escribe tu pregunta…"
                className="h-9 flex-1 rounded-lg border border-hairline bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Enviar pregunta"
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-3.5" aria-hidden />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Cerrar preguntas frecuentes" : "Abrir preguntas frecuentes"}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] transition-all hover:opacity-90",
          open && "h-10 px-3",
        )}
      >
        {open ? <X className="size-4" aria-hidden /> : <MessageCircle className="size-4" aria-hidden />}
        <span className={cn(open ? "hidden" : "hidden sm:inline")}>{open ? "Cerrar" : "¿Dudas?"}</span>
      </button>
    </div>
  );
}
