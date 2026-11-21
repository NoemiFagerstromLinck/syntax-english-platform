import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "night" | "paper";

const STORAGE_KEY = "syntax-theme";

const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  theme: "night",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start on the server value so hydration matches; the effect below
  // re-syncs from storage before the first paint is committed.
  const [theme, setTheme] = useState<Theme>("night");
  const synced = useRef(false);

  useEffect(() => {
    if (!synced.current) {
      synced.current = true;
      let stored: Theme = "night";
      try {
        stored = localStorage.getItem(STORAGE_KEY) === "paper" ? "paper" : "night";
      } catch {
        // Storage can be blocked; fall back to the default theme.
      }
      if (stored !== theme) {
        setTheme(stored);
        return;
      }
    }

    const root = document.documentElement;
    root.dataset["theme"] = theme;
    root.classList.toggle("dark", theme === "night");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked; the theme still applies for this session.
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: "night" as const, label: "Obsidian theme", icon: Moon },
    { value: "paper" as const, label: "Paper theme", icon: Sun },
  ];

  return (
    <div role="group" aria-label="Colour theme" className={cn("inline-flex items-center gap-0.5 rounded-lg border border-hairline bg-surface p-0.5", className)}>
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            title={option.label}
            className={cn(
              "grid size-7 place-items-center rounded-md transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
