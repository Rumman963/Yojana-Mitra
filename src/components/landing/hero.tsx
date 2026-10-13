"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useT } from "@/components/language-provider";

export function Hero() {
  const t = useT();

  const points = [
    { icon: BadgeCheck, text: t("heroPoint1") },
    { icon: Sparkles, text: t("heroPoint2") },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {t("heroBadge")}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {t("heroTitleStart")}
            <span className="text-primary">{t("heroTitleHighlight")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/find" className={buttonVariants({ size: "lg" })}>
              {t("heroCta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="#how"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              {t("heroHow")}
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