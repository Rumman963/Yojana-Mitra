import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
                      <Image
            src="/logo.svg"
            alt="YojanaMitra logo"
            width={36}
            height={36}
            priority
            className="h-15"
            style={{ width: "auto" }}
          />

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