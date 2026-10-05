import Link from "next/link";
import { Landmark } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold">
            YojanaMitra
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/find" className={buttonVariants({ size: "sm" })}>
            Find schemes
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}