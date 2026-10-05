"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wizard, type ProfileInput } from "@/components/find/wizard";
import ResultsList, { type SchemeResult } from "@/components/ResultsList";

export default function FindPage() {
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
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setMatches(data.matches);
      }
    } catch {
      setMessage("Could not reach the server. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      {matches === null ? (
        <>
          <h1 className="mb-6 font-display text-3xl font-semibold">
            Find your schemes
          </h1>
          <Wizard onSubmit={handleSubmit} loading={loading} />
          {message !== "" && <p className="mt-4 text-red-500">{message}</p>}
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-display text-3xl font-semibold">
              Your schemes
            </h1>
            <Button variant="outline" onClick={() => setMatches(null)}>
              Change my answers
            </Button>
          </div>
          <ResultsList matches={matches} />
        </>
      )}
    </main>
  );
}