import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LayoutGrid, Layers, NotebookPen, Radar, MessagesSquare, MonitorPlay, UserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { currentSprint, student } from "@/data/platform";
import { ThemeToggle } from "./theme";
import { Meter } from "./primitives";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/sprint", label: "Sprint Workspace", icon: Layers },
  { to: "/learning-pad", label: "Learning Pad", icon: NotebookPen },
  { to: "/competencies", label: "Competency Profile", icon: Radar },
  { to: "/sessions", label: "Tutor Sessions", icon: MessagesSquare },
  { to: "/interview-lab", label: "Interview Lab", icon: MonitorPlay },
  { to: "/profile", label: "Student Profile", icon: UserRound },
] as const;

function Brand() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2.5 rounded-md">
      <span className="grid size-8 place-items-center rounded-lg border border-comm/40 bg-comm-soft font-mono text-sm font-semibold text-comm" aria-hidden>
        {"</>"}
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">dCoder</span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Main" className="flex flex-col gap-0.5">
      {nav.map((item, i) => {
        const active = item.to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              active ? "bg-comm-soft text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            {active ? <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-comm" aria-hidden /> : null}
            <Icon className={cn("size-4", active ? "text-comm" : "")} aria-hidden />
            <span className="flex-1">{item.label}</span>
            <span className="font-mono text-[10px] text-muted-foreground/70">0{i + 1}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-muted-foreground">Theme</span>
        <ThemeToggle />
      </div>
      <Link to="/sprint" className="block rounded-xl border border-sidebar-border p-3 transition-colors hover:border-comm/40">
        <p className="eyebrow">{currentSprint.code} · Day {currentSprint.currentDay}/{currentSprint.totalDays}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{currentSprint.title}</p>
        <Meter value={currentSprint.progress} className="mt-3" label="Sprint progress" />
      </Link>
      <Link to="/profile" className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-sidebar-accent/60">
        <span className="grid size-9 place-items-center rounded-full bg-secondary font-mono text-xs text-foreground">{student.initials}</span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">{student.name}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {student.technical.seniority} frontend · English {student.communication.current}
          </span>
        </span>
      </Link>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
        <div className="space-y-8">
          <div className="px-2">
            <Brand />
          </div>
          <NavList />
        </div>
        <SidebarFooter />
      </aside>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-sidebar-border bg-sidebar/95 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="grid size-9 place-items-center rounded-lg border border-hairline text-foreground" aria-label="Open navigation">
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col justify-between border-sidebar-border bg-sidebar">
              <div className="space-y-8">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Brand />
                <NavList onNavigate={() => setOpen(false)} />
              </div>
              <SidebarFooter />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <main id="main" className="lg:pl-64">
        <div>
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12">{children}</div>
        </div>
      </main>
    </div>
  );
}
