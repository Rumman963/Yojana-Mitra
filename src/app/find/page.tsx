"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wizard, type ProfileInput } from "@/components/find/wizard";
import ResultsList, { type SchemeResult } from "@/components/ResultsList";
import { useT } from "@/components/language-provider";

export default function FindPage() {
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<SchemeResult[] | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(profile: ProfileInput) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profile }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(t("errorGeneric"));
      } else {
        setMatches(data.matches);
      }
    } catch {
      setMessage(t("errorNetwork"));
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {matches === null ? (
        <>
          <h1 className="mb-6 font-display text-3xl font-semibold">
            {t("findTitle")}
          </h1>
          <Wizard onSubmit={handleSubmit} loading={loading} />
          {message !== "" && <p className="mt-4 text-red-500">{message}</p>}
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-display text-3xl font-semibold">
              {t("yourSchemes")}
            </h1>
            <Button variant="outline" onClick={() => setMatches(null)}>
              {t("changeAnswers")}
            </Button>
          </div>
          <ResultsList matches={matches} />
        </>
      )}
    </main>
  );
}