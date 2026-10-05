import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">
        We could not find that page
      </h1>
      <p className="mt-2 text-muted-foreground">
        The page may have moved, or the scheme may no longer be listed.
      </p>
      <Link href="/find" className={buttonVariants({ className: "mt-8" })}>
        Find schemes for me
      </Link>
    </main>
  );
}