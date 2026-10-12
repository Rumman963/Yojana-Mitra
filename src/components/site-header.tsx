import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image 
          src="/yojana-mitra-icon.svg"
          alt="Yojana Mitra"
          width={56}
          height={56}
          priority
          style={{
      width: "50px",
      height: "50px",
      objectFit: "contain",
    }}
       
            />

            <div className="flex flex-col justify-center gap-0.5">
    <span className="text-xl font-bold leading-tight tracking-tight text-[#123B70]">
      Yojana Mitra
    </span>

    <span className="text-xs leading-tight text-[#45617F]">
      आपकी योजनाओं का साथी
    </span>

    <span className="text-[10px] leading-tight text-[#64748B]">
      Your trusted companion for government schemes
    </span>
  </div>

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