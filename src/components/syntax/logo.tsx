import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "header",
}: {
  className?: string;
  variant?: "header" | "full";
}) {
  const base = import.meta.env.BASE_URL;
  const file = variant === "full" ? "dcoder-full" : "dcoder-header";

  return (
    <span className={cn("inline-flex h-8 items-center", className)}>
      <img src={`${base}brand/${file}.png`} alt="dCoder" className="hidden h-full w-auto dark:block" />
      <img src={`${base}brand/${file}-paper.png`} alt="dCoder" className="block h-full w-auto dark:hidden" />
    </span>
  );
}
