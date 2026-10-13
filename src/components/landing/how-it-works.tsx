"use client";

import { ClipboardList, FileCheck2, Search } from "lucide-react";
import { useT } from "@/components/language-provider";

export function HowItWorks() {
  const t = useT();

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), text: t("step1Text") },
    { icon: Search, title: t("step2Title"), text: t("step2Text") },
    { icon: FileCheck2, title: t("step3Title"), text: t("step3Text") },
  ];

  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center font-display text-3xl font-semibold sm:text-4xl">
        {t("howTitle")}
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <step.icon className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("howStep")} {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}