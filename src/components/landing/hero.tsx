"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const points = [
  { icon: BadgeCheck, text: "Checked against official sources" },
  { icon: Sparkles, text: "Free to use, no sign-up" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft glow shapes in the background */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            26 States Supported
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Find the government schemes you{" "}
            <span className="text-primary">actually qualify for</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Answer a few simple questions. We show the schemes that fit you,
            what you will get, and the documents to keep ready.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/find" className={buttonVariants({ size: "lg" })}>
              Find my schemes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="#how"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              How it works
            </a>
          </div>

          <ul className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-2">
                <point.icon className="h-4 w-4 text-primary" />
                {point.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}